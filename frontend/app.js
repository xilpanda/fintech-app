const STORAGE_KEY = "fintech_wallet_api_base";
const state = {
  users: [],
  transactions: [],
};

const ui = {
  usersTable: document.getElementById("users-table"),
  transfersTable: document.getElementById("transfers-table"),
  createUserForm: document.getElementById("create-user-form"),
  transferForm: document.getElementById("transfer-form"),
  fromUserSelect: document.getElementById("from-user"),
  toUserSelect: document.getElementById("to-user"),
  refreshUsersButton: document.getElementById("refresh-users"),
  refreshTransfersButton: document.getElementById("refresh-transfers"),
  metricUsers: document.getElementById("metric-users"),
  metricBalance: document.getElementById("metric-balance"),
  metricTransfers: document.getElementById("metric-transfers"),
  metricHealth: document.getElementById("metric-health"),
  apiSettingsForm: document.getElementById("api-settings-form"),
  apiBaseInput: document.getElementById("api-base-url"),
  toast: document.getElementById("toast"),
};

let toastTimer = null;
let autoRefreshTimer = null;

function currentApiBase() {
  return localStorage.getItem(STORAGE_KEY) || "http://localhost:8000";
}

function setApiBase(url) {
  localStorage.setItem(STORAGE_KEY, url);
  ui.apiBaseInput.value = url;
}

async function api(path, options = {}) {
  const response = await fetch(`${currentApiBase()}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try {
    data = await response.json();
  } catch (_error) {
    data = null;
  }

  if (!response.ok) {
    const detail =
      (data && (data.detail || data.message || JSON.stringify(data))) ||
      `HTTP ${response.status}`;
    throw new Error(detail);
  }

  return data;
}

function showToast(message, isError = false) {
  ui.toast.textContent = message;
  ui.toast.classList.add("show");
  ui.toast.classList.toggle("error", isError);
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = setTimeout(() => {
    ui.toast.classList.remove("show");
    ui.toast.classList.remove("error");
  }, 3000);
}

function formatMoney(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function formatTime(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleString();
}

function renderUsers() {
  if (state.users.length === 0) {
    ui.usersTable.innerHTML = `<tr><td colspan="3">No users yet</td></tr>`;
    ui.fromUserSelect.innerHTML = `<option value="">No users</option>`;
    ui.toUserSelect.innerHTML = `<option value="">No users</option>`;
    return;
  }

  ui.usersTable.innerHTML = state.users
    .map(
      (user) => `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${formatMoney(user.balance)}</td>
        </tr>
      `
    )
    .join("");

  const options = state.users
    .map((user) => `<option value="${user.id}">${user.id} - ${user.name}</option>`)
    .join("");
  ui.fromUserSelect.innerHTML = options;
  ui.toUserSelect.innerHTML = options;
}

function renderTransactions() {
  if (state.transactions.length === 0) {
    ui.transfersTable.innerHTML = `<tr><td colspan="5">No transfers yet</td></tr>`;
    return;
  }

  ui.transfersTable.innerHTML = state.transactions
    .map(
      (txn) => `
        <tr>
          <td>${txn.id}</td>
          <td>${txn.from_user_id}</td>
          <td>${txn.to_user_id}</td>
          <td>${formatMoney(txn.amount)}</td>
          <td>${formatTime(txn.created_at)}</td>
        </tr>
      `
    )
    .join("");
}

function renderMetrics() {
  const totalBalance = state.users.reduce((sum, user) => sum + Number(user.balance), 0);
  ui.metricUsers.textContent = String(state.users.length);
  ui.metricBalance.textContent = formatMoney(totalBalance);
  ui.metricTransfers.textContent = String(state.transactions.length);
}

async function loadUsers() {
  state.users = await api("/users/");
  renderUsers();
  renderMetrics();
}

async function loadTransactions() {
  state.transactions = await api("/transactions/?limit=100");
  renderTransactions();
  renderMetrics();
}

async function checkHealth() {
  try {
    await api("/health/ready");
    ui.metricHealth.textContent = "Ready";
    ui.metricHealth.className = "status status-up";
  } catch (_error) {
    ui.metricHealth.textContent = "Not Ready";
    ui.metricHealth.className = "status status-down";
  }
}

async function refreshAll() {
  await Promise.all([loadUsers(), loadTransactions(), checkHealth()]);
}

function wireEvents() {
  ui.apiSettingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const normalized = ui.apiBaseInput.value.trim().replace(/\/$/, "");
    if (!normalized) {
      showToast("API base URL is required.", true);
      return;
    }
    setApiBase(normalized);
    try {
      await refreshAll();
      showToast("API base URL updated.");
    } catch (error) {
      showToast(`Failed to connect: ${error.message}`, true);
    }
  });

  ui.createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(ui.createUserForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      initial_balance: Number(formData.get("initial_balance")),
    };
    try {
      await api("/users/", { method: "POST", body: JSON.stringify(payload) });
      ui.createUserForm.reset();
      ui.createUserForm.querySelector("#user-balance").value = "100";
      await refreshAll();
      showToast("User created successfully.");
    } catch (error) {
      showToast(`Create user failed: ${error.message}`, true);
    }
  });

  ui.transferForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(ui.transferForm);
    const payload = {
      from_id: Number(formData.get("from_id")),
      to_id: Number(formData.get("to_id")),
      amount: Number(formData.get("amount")),
    };
    try {
      const result = await api("/transactions/transfer", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      ui.transferForm.reset();
      await refreshAll();
      showToast(`${result.message} (#${result.transaction_id})`);
    } catch (error) {
      showToast(`Transfer failed: ${error.message}`, true);
    }
  });

  ui.refreshUsersButton.addEventListener("click", async () => {
    try {
      await loadUsers();
      await checkHealth();
      showToast("Users refreshed.");
    } catch (error) {
      showToast(`Refresh failed: ${error.message}`, true);
    }
  });

  ui.refreshTransfersButton.addEventListener("click", async () => {
    try {
      await loadTransactions();
      await checkHealth();
      showToast("Transfers refreshed.");
    } catch (error) {
      showToast(`Refresh failed: ${error.message}`, true);
    }
  });
}

async function bootstrap() {
  setApiBase(currentApiBase().replace(/\/$/, ""));
  wireEvents();
  try {
    await refreshAll();
    showToast("Dashboard connected.");
  } catch (error) {
    showToast(`Initial load failed: ${error.message}`, true);
  }

  autoRefreshTimer = setInterval(async () => {
    try {
      await refreshAll();
    } catch (_error) {
      ui.metricHealth.textContent = "Unreachable";
      ui.metricHealth.className = "status status-down";
    }
  }, 15000);
}

window.addEventListener("beforeunload", () => {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
  }
});

bootstrap();
