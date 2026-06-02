const endpointList = document.getElementById("endpoint-list");
const endpointCount = document.getElementById("endpoint-count");
const endpointSearch = document.getElementById("endpoint-search");
const endpointInput = document.getElementById("endpoint-input");
const methodSelect = document.getElementById("method-select");
const payloadInput = document.getElementById("payload-input");
const jsonOutput = document.getElementById("json-output");
const summary = document.getElementById("summary");
const statusBadge = document.getElementById("status-badge");
const refreshTokenInput = document.getElementById("refresh-token");
const generateTokenButton = document.getElementById("generate-token");
const testCommonButton = document.getElementById("test-common");
const runEndpointButton = document.getElementById("run-endpoint");
const heroEndpointCount = document.getElementById("hero-endpoint-count");
const heroScopeCount = document.getElementById("hero-scope-count");
const heroScopeText = document.getElementById("hero-scope-text");
const heroLastAction = document.getElementById("hero-last-action");
const heroLastEndpoint = document.getElementById("hero-last-endpoint");
const selectedEndpointText = document.getElementById("selected-endpoint-text");
const selectedEndpointMeta = document.getElementById("selected-endpoint-meta");
const useSelectedButton = document.getElementById("use-selected");
const runSelectedButton = document.getElementById("run-selected");
const copyEndpointButton = document.getElementById("copy-endpoint");
const copyJsonButton = document.getElementById("copy-json");
const clearResultButton = document.getElementById("clear-result");
const resultFile = document.getElementById("result-file");
const activityList = document.getElementById("activity-list");
const activityCount = document.getElementById("activity-count");
const toast = document.getElementById("toast");
const loadingOverlay = document.getElementById("loading-overlay");
const loadingText = document.getElementById("loading-text");
const modal = document.getElementById("placeholder-modal");
const placeholderForm = document.getElementById("placeholder-form");
const placeholderFields = document.getElementById("placeholder-fields");
const closeModalButton = document.getElementById("close-modal");
const cancelModalButton = document.getElementById("cancel-modal");
const quickActionButtons = [...document.querySelectorAll(".chip")];
const crudActionButtons = [...document.querySelectorAll(".crud-chip")];

const commonEndpoints = [
  "/status",
  "/Administration/User/Me",
  "/Assistance/Ticket",
];

const state = {
  endpoints: [],
  filteredEndpoints: [],
  selectedEndpoint: "/Administration/User/Me",
  token: null,
  latestPayload: {},
  selectedMethod: "GET",
  lastAction: "En attente",
  activities: [],
  modalResolver: null,
  lastFocusedElement: null,
};

function normalizeEndpoint(endpoint) {
  if (!endpoint) return "/Administration/User/Me";
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
}

function countPlaceholders(endpoint) {
  return [...endpoint.matchAll(/\{([^}]+)\}/g)].length;
}

function setBusy(isBusy, label = "Traitement en cours...") {
  for (const button of [
    generateTokenButton,
    testCommonButton,
    runEndpointButton,
    useSelectedButton,
    runSelectedButton,
    copyEndpointButton,
    copyJsonButton,
    clearResultButton,
    ...quickActionButtons,
    ...crudActionButtons,
  ]) {
    button.disabled = isBusy;
  }

  methodSelect.disabled = isBusy;
  payloadInput.disabled = isBusy;

  loadingText.textContent = label;
  loadingOverlay.classList.toggle("hidden", !isBusy);
  loadingOverlay.setAttribute("aria-hidden", String(!isBusy));
}

function setStatus(label, tone = "muted") {
  statusBadge.textContent = label;
  statusBadge.className = "badge";
  if (tone === "success") statusBadge.classList.add("badge-success");
  else if (tone === "error") statusBadge.classList.add("badge-error");
  else statusBadge.classList.add("badge-muted");
}

function showToast(message, tone = "neutral") {
  toast.textContent = message;
  toast.className = "toast";
  if (tone === "success") toast.classList.add("toast-success");
  else if (tone === "error") toast.classList.add("toast-error");
  else toast.classList.add("toast-neutral");

  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

function renderJson(data) {
  jsonOutput.textContent = JSON.stringify(data ?? {}, null, 2);
}

function renderSummary(items) {
  summary.innerHTML = "";
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "summary-card";
    card.innerHTML = `<span>${item.label}</span><strong>${item.value}</strong>`;
    summary.appendChild(card);
  }
}

function renderActivity() {
  activityCount.textContent = `${state.activities.length} action${state.activities.length > 1 ? "s" : ""}`;
  activityList.innerHTML = "";

  if (state.activities.length === 0) {
    activityList.innerHTML = `<div class="empty-state">Aucune action récente.</div>`;
    return;
  }

  for (const entry of state.activities) {
    const item = document.createElement("article");
    item.className = "activity-item";
    item.innerHTML = `
      <div class="activity-dot ${entry.ok ? "activity-ok" : "activity-error"}"></div>
      <div class="activity-content">
        <strong>${entry.title}</strong>
        <span>${entry.meta}</span>
      </div>
    `;
    activityList.appendChild(item);
  }
}

function updateHero() {
  heroEndpointCount.textContent = String(state.endpoints.length);
  heroLastAction.textContent = state.lastAction;
  heroLastEndpoint.textContent = state.selectedEndpoint || "Aucun endpoint exécuté";

  const scopes = state.token?.scopes || [];
  heroScopeCount.textContent = String(scopes.length);
  heroScopeText.textContent = scopes.length ? scopes.join(", ") : "Aucun token chargé";
}

function getRequestPayload() {
  const method = methodSelect.value;
  if (!["POST", "PUT", "PATCH"].includes(method)) {
    return null;
  }

  const rawPayload = payloadInput.value.trim();
  if (!rawPayload) {
    return {};
  }

  return JSON.parse(rawPayload);
}

function updateSelectedEndpointCard() {
  const placeholderCount = countPlaceholders(state.selectedEndpoint);
  selectedEndpointText.textContent = state.selectedEndpoint;
  selectedEndpointMeta.textContent =
    placeholderCount > 0
      ? `${placeholderCount} paramètre${placeholderCount > 1 ? "s" : ""} à compléter avant exécution.`
      : "Endpoint prêt à être testé.";
}

function selectEndpoint(endpoint, updateInput = false) {
  state.selectedEndpoint = normalizeEndpoint(endpoint);
  updateSelectedEndpointCard();
  renderEndpointList(state.filteredEndpoints);
  if (updateInput) {
    endpointInput.value = state.selectedEndpoint;
  }
}

function renderEndpointList(items) {
  endpointCount.textContent = String(items.length);
  endpointList.innerHTML = "";

  if (items.length === 0) {
    endpointList.innerHTML = `<div class="empty-state">Aucun endpoint ne correspond à cette recherche.</div>`;
    return;
  }

  for (const endpoint of items) {
    const button = document.createElement("button");
    const placeholderCount = countPlaceholders(endpoint);
    button.className = `endpoint-item ${endpoint === state.selectedEndpoint ? "endpoint-item-active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <strong>${endpoint}</strong>
      <span>${placeholderCount > 0 ? `${placeholderCount} paramètre${placeholderCount > 1 ? "s" : ""}` : "Prêt à l'emploi"}</span>
    `;
    button.addEventListener("click", () => {
      selectEndpoint(endpoint, true);
    });
    endpointList.appendChild(button);
  }
}

function openPlaceholderModal(placeholders) {
  state.lastFocusedElement = document.activeElement;
  placeholderFields.innerHTML = "";

  for (const name of placeholders) {
    const field = document.createElement("label");
    field.className = "modal-field";
    field.innerHTML = `
      <span>${name}</span>
      <input name="${name}" type="text" placeholder="Valeur pour ${name}" required />
    `;
    placeholderFields.appendChild(field);
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");

  const firstInput = placeholderFields.querySelector("input");
  if (firstInput) firstInput.focus();

  return new Promise((resolve) => {
    state.modalResolver = resolve;
  });
}

function closePlaceholderModal(values = null) {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  placeholderFields.innerHTML = "";
  if (state.modalResolver) {
    state.modalResolver(values);
    state.modalResolver = null;
  }
  if (state.lastFocusedElement instanceof HTMLElement) {
    state.lastFocusedElement.focus();
  }
}

async function resolveEndpoint(endpoint) {
  let resolved = normalizeEndpoint(endpoint);
  const placeholders = [...resolved.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);

  if (placeholders.length === 0) {
    return resolved;
  }

  const values = await openPlaceholderModal(placeholders);
  if (!values) return null;

  for (const [name, value] of Object.entries(values)) {
    resolved = resolved.replaceAll(`{${name}}`, value);
  }

  return resolved;
}

async function copyText(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    showToast(successMessage, "success");
  } catch {
    showToast("Copie impossible depuis ce navigateur.", "error");
  }
}

function addActivity(title, meta, ok = true) {
  state.activities.unshift({ title, meta, ok });
  state.activities = state.activities.slice(0, 8);
  renderActivity();
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

async function loadEndpoints() {
  const data = await apiFetch("/api/endpoints");
  state.endpoints = data.endpoints || [];
  state.filteredEndpoints = [...state.endpoints];
  renderEndpointList(state.filteredEndpoints);
  updateHero();
}

async function generateToken() {
  setBusy(true, "Génération du token...");
  setStatus("Génération du token...", "muted");

  try {
    const data = await apiFetch("/api/token", { method: "POST", body: "{}" });
    state.token = data.token;
    state.lastAction = "Token généré";
    updateHero();

    renderSummary([
      { label: "Action", value: "Token généré" },
      { label: "Type", value: data.token.token_type || "inconnu" },
      { label: "Expiration", value: `${data.token.expires_in || "?"} secondes` },
      { label: "Scopes", value: (data.token.scopes || []).join(", ") || "aucun" },
    ]);
    resultFile.textContent = "JSON/getToken.json";
    renderJson(data.token);
    setStatus("Token prêt", "success");
    addActivity("Token régénéré", "Scopes mis à jour", true);
    showToast("Token généré avec succès.", "success");
  } catch (error) {
    state.lastAction = "Erreur token";
    updateHero();
    renderSummary([
      { label: "Action", value: "Échec de génération" },
      { label: "Détail", value: error.stderr || error.error || "Erreur inconnue" },
    ]);
    resultFile.textContent = "Aucun fichier de sortie";
    renderJson(error);
    setStatus("Erreur token", "error");
    addActivity("Erreur token", "La génération a échoué", false);
    showToast("La génération du token a échoué.", "error");
  } finally {
    setBusy(false);
  }
}

async function runSingleEndpoint(endpoint = endpointInput.value, options = {}) {
  const resolved = options.skipResolve ? normalizeEndpoint(endpoint) : await resolveEndpoint(endpoint);
  if (!resolved) return;

  let payload = null;
  try {
    payload = getRequestPayload();
  } catch {
    renderSummary([
      { label: "Statut", value: "JSON invalide" },
      { label: "Détail", value: "Le corps JSON n'est pas valide." },
    ]);
    setStatus("JSON invalide", "error");
    showToast("Le corps JSON n'est pas valide.", "error");
    payloadInput.focus();
    return;
  }

  setBusy(true, "Test de l'endpoint...");
  setStatus("Test en cours...", "muted");

  try {
    const data = await apiFetch("/api/test", {
      method: "POST",
      body: JSON.stringify({
        endpoint: resolved,
        method: methodSelect.value,
        payload,
        refresh_token: refreshTokenInput.checked,
      }),
    });

    state.lastAction = "Test réussi";
    state.latestPayload = data.response;
    state.selectedEndpoint = data.endpoint;
    selectEndpoint(data.endpoint, true);
    updateHero();

    renderSummary([
      { label: "Méthode", value: data.method },
      { label: "Endpoint", value: data.endpoint },
      { label: "Statut", value: "Succès" },
      { label: "HTTP", value: data.http_status || "?" },
      { label: "Sortie", value: data.output_file.split("/").slice(-1)[0] || data.output_file },
    ]);
    resultFile.textContent = data.output_file;
    renderJson(data.response);
    setStatus("Test réussi", "success");
    addActivity(`${data.method} ${data.endpoint}`, `HTTP ${data.http_status || "?"}`, true);
    showToast(`Test réussi pour ${data.method} ${data.endpoint}`, "success");
  } catch (error) {
    state.lastAction = "Test en erreur";
    updateHero();
    renderSummary([
      { label: "Méthode", value: methodSelect.value },
      { label: "Endpoint", value: error.endpoint || resolved },
      { label: "Statut", value: "Erreur" },
      { label: "HTTP", value: error.http_status || "?" },
    ]);
    resultFile.textContent = error.output_file || "Aucun fichier de sortie";
    renderJson(error.response || error);
    setStatus("Test en erreur", "error");
    addActivity(`${methodSelect.value} ${error.endpoint || resolved}`, `HTTP ${error.http_status || "?"}`, false);
    showToast(`Le test a échoué pour ${methodSelect.value} ${error.endpoint || resolved}`, "error");
  } finally {
    setBusy(false);
  }
}

async function runCommonEndpoints() {
  setBusy(true, "Tests multiples...");
  setStatus("Tests multiples...", "muted");

  try {
    const data = await apiFetch("/api/test-batch", {
      method: "POST",
      body: JSON.stringify({
        endpoints: commonEndpoints,
        refresh_token: refreshTokenInput.checked,
      }),
    });

    state.lastAction = "Batch terminé";
    updateHero();

    const successCount = data.results.filter((result) => result.ok).length;
    renderSummary([
      { label: "Mode", value: "Batch" },
      { label: "Endpoints", value: String(data.results.length) },
      { label: "Succès", value: String(successCount) },
      { label: "Échecs", value: String(data.results.length - successCount) },
    ]);
    resultFile.textContent = "Plusieurs fichiers JSON générés";
    renderJson(data.results);
    setStatus("Batch terminé", data.ok ? "success" : "error");
    addActivity("Batch commun", `${successCount}/${data.results.length} réussites`, data.ok);
    showToast("Tests communs terminés.", data.ok ? "success" : "error");
  } catch (error) {
    state.lastAction = "Batch en erreur";
    updateHero();
    if (Array.isArray(error.results)) {
      const successCount = error.results.filter((result) => result.ok).length;
      renderSummary([
        { label: "Mode", value: "Batch" },
        { label: "Endpoints", value: String(error.results.length) },
        { label: "Succès", value: String(successCount) },
        { label: "Échecs", value: String(error.results.length - successCount) },
      ]);
      renderJson(error.results);
      addActivity("Batch partiel", `${successCount}/${error.results.length} réussites`, false);
    } else {
      renderSummary([
        { label: "Mode", value: "Batch" },
        { label: "Statut", value: "Erreur" },
        { label: "Détail", value: error.error || "Le batch a échoué" },
      ]);
      renderJson(error);
      addActivity("Batch en erreur", "Échec global", false);
    }
    resultFile.textContent = "Batch interrompu";
    setStatus("Batch en erreur", "error");
    showToast("Le batch a rencontré une erreur.", "error");
  } finally {
    setBusy(false);
  }
}

function clearResult() {
  state.latestPayload = {};
  renderSummary([
    { label: "Action", value: "Zone vidée" },
    { label: "Statut", value: "Prête pour un nouveau test" },
  ]);
  resultFile.textContent = "Aucun fichier de sortie";
  renderJson({});
  setStatus("En attente", "muted");
  showToast("Zone de résultat vidée.", "neutral");
}

endpointSearch.addEventListener("input", () => {
  const query = endpointSearch.value.trim().toLowerCase();
  state.filteredEndpoints = !query
    ? [...state.endpoints]
    : state.endpoints.filter((endpoint) => endpoint.toLowerCase().includes(query));
  renderEndpointList(state.filteredEndpoints);
});

generateTokenButton.addEventListener("click", generateToken);
testCommonButton.addEventListener("click", runCommonEndpoints);
runEndpointButton.addEventListener("click", () => runSingleEndpoint());
methodSelect.addEventListener("change", () => {
  state.selectedMethod = methodSelect.value;
});
useSelectedButton.addEventListener("click", () => {
  endpointInput.value = state.selectedEndpoint;
  showToast("Endpoint injecté dans le champ manuel.", "success");
});
runSelectedButton.addEventListener("click", () => runSingleEndpoint(state.selectedEndpoint));
copyEndpointButton.addEventListener("click", () => copyText(state.selectedEndpoint, "Endpoint copié."));
copyJsonButton.addEventListener("click", () => copyText(jsonOutput.textContent, "JSON copié."));
clearResultButton.addEventListener("click", clearResult);

for (const button of quickActionButtons) {
  button.addEventListener("click", () => {
    if (button.classList.contains("crud-chip")) return;
    const endpoint = button.dataset.endpoint;
    selectEndpoint(endpoint, true);
    runSingleEndpoint(endpoint);
  });
}

for (const button of crudActionButtons) {
  button.addEventListener("click", () => {
    methodSelect.value = button.dataset.method;
    state.selectedMethod = button.dataset.method;
    showToast(`Méthode ${button.dataset.method} sélectionnée.`, "success");
  });
}

endpointInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    runSingleEndpoint();
  }
});

placeholderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(placeholderForm);
  const values = Object.fromEntries(formData.entries());
  closePlaceholderModal(values);
});

closeModalButton.addEventListener("click", () => closePlaceholderModal(null));
cancelModalButton.addEventListener("click", () => closePlaceholderModal(null));
modal.addEventListener("click", (event) => {
  if (event.target.dataset.closeModal === "true") {
    closePlaceholderModal(null);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closePlaceholderModal(null);
  }
});

renderSummary([
  { label: "Action", value: "En attente" },
  { label: "Conseil", value: "Sélectionne un endpoint puis lance un test." },
]);
updateSelectedEndpointCard();
renderActivity();
updateHero();

loadEndpoints().catch((error) => {
  renderSummary([
    { label: "Chargement", value: "Impossible de lire endpointDOC.json" },
    { label: "Détail", value: error.error || "Erreur inconnue" },
  ]);
  renderJson(error);
  setStatus("Chargement KO", "error");
  showToast("Impossible de charger la liste des endpoints.", "error");
});
