function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setYear() {
  const el = qs("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setupMobileNav() {
  const toggle = qs("[data-nav-toggle]");
  const panel = qs("[data-nav-panel]");
  if (!toggle || !panel) return;

  const close = () => {
    panel.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
  };

  const open = () => {
    panel.dataset.open = "true";
    toggle.setAttribute("aria-expanded", "true");
  };

  close();

  toggle.addEventListener("click", () => {
    const isOpen = panel.dataset.open === "true";
    if (isOpen) close();
    else open();
  });

  // Close on nav link click (mobile)
  qsa("a.nav-link", panel).forEach((a) => {
    a.addEventListener("click", close);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (panel.dataset.open !== "true") return;
    const t = /** @type {HTMLElement} */ (e.target);
    if (toggle.contains(t) || panel.contains(t)) return;
    close();
  });
}

function isValidEmail(email) {
  // Simple and practical
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupContactForm() {
  const form = qs("[data-contact-form]");
  const result = qs("[data-form-result]");
  if (!form || !result) return;

  const setResult = (msg, type) => {
    result.textContent = msg;
    result.classList.remove("ok", "ng");
    if (type) result.classList.add(type);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const topic = String(fd.get("topic") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name) return setResult("お名前を入力してください。", "ng");
    if (!email) return setResult("メールアドレスを入力してください。", "ng");
    if (!isValidEmail(email)) return setResult("メールアドレスの形式が正しくありません。", "ng");
    if (!message) return setResult("内容を入力してください。", "ng");

    const subject = `【お問い合わせ】${topic} / ${name}`;
    const body = [
      "トロマツ 御中",
      "",
      "以下の内容でお問い合わせします。",
      "",
      `お名前: ${name}`,
      `メール: ${email}`,
      `種別: ${topic}`,
      "",
      "内容:",
      message,
      "",
      "--",
      "（このメールはサイトのフォームから作成されました）",
    ].join("\n");

    const to = "hello@example.com";
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setResult("メール作成画面を開きます…", "ok");
    window.location.href = mailto;
  });
}

setYear();
setupMobileNav();
setupContactForm();

