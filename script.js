document.addEventListener('DOMContentLoaded', () => {
  const cartCountEls = document.querySelectorAll('#cart-count');
  let cartCount = 0;
  function updateCartCount() {
    cartCountEls.forEach(el => el.textContent = cartCount);
  }
  updateCartCount();


  const msgEl = document.getElementById('dynamic-msg');
  if (msgEl) {
    const now = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    msgEl.textContent = `Hoy es ${now.toLocaleDateString('es-ES', opciones)}. ¡Bienvenido!`;
  }


  const acepta = document.getElementById('acepto');
  const btnRegistro = document.getElementById('btn-registro');
  const formRegistro = document.getElementById('form-registro');
  const registroMsg = document.getElementById('registro-msg');

  if (acepta && btnRegistro && formRegistro) {
    acepta.addEventListener('change', () => {
      btnRegistro.disabled = !acepta.checked;
    });

    formRegistro.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!formRegistro.checkValidity()) {
        registroMsg.textContent = 'Por favor rellena todos los campos correctamente.';
        registroMsg.style.color = 'crimson';
        return;
      }
      registroMsg.textContent = '¡Registro exitoso! (simulado)';
      registroMsg.style.color = 'green';
      formRegistro.reset();
      btnRegistro.disabled = true;
    });
  }


  const toggleBtn = document.getElementById('toggle-mas');
  const descCompleta = document.getElementById('descripcion-completa');
  if (toggleBtn && descCompleta) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = descCompleta.classList.toggle('hidden');
      toggleBtn.textContent = isHidden ? 'Ver más' : 'Ver menos';
    });
  }


  const addButtons = document.querySelectorAll('.add-cart');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      cartCount += 1;
      updateCartCount();
      // Mensaje breve
      showToast(`"${name}" agregado al carrito — $${price}`);
    });
  });


  const cartTable = document.getElementById('cart-table');
  if (cartTable) {
    const qtyInputs = cartTable.querySelectorAll('.qty');
    const totalEl = document.getElementById('total-amount');

    function recalcRow(row) {
      const qty = Number(row.querySelector('.qty').value) || 0;
      const price = Number(row.querySelector('.price').textContent) || 0;
      const subtotal = qty * price;
      row.querySelector('.subtotal').textContent = subtotal;
    }

    function recalcTotal() {
      let total = 0;
      cartTable.querySelectorAll('tbody tr').forEach(row => {
        recalcRow(row);
        total += Number(row.querySelector('.subtotal').textContent) || 0;
      });
      totalEl.textContent = total;
    }

    qtyInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (input.value < 1) input.value = 1;
        recalcTotal();
      });
    });

    recalcTotal();
  }


  const formBusqueda = document.getElementById('form-busqueda');
  const inputBusqueda = document.getElementById('input-busqueda');
  const resultados = document.getElementById('resultados');

  if (formBusqueda && inputBusqueda && resultados) {
    formBusqueda.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = inputBusqueda.value.trim();
      if (!term) return;
      resultados.innerHTML = `<h3>Resultados para la búsqueda de <em>${escapeHtml(term)}</em></h3>`;

      const sample = [
        {name:'Camisa casual', price:350},
        {name:'Zapatos deportivos', price:850},
        {name:'Gorra unisex', price:150}
      ];
      const ul = document.createElement('ul');
      sample.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} — $${p.price}`;
        ul.appendChild(li);
      });
      resultados.appendChild(ul);
    });
  }


  function showToast(text, ms = 2200) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    Object.assign(t.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      background: '#111827',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '8px',
      boxShadow: '0 6px 18px rgba(15,23,42,0.12)',
      zIndex: 9999,
    });
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; }, ms - 300);
    setTimeout(() => { t.remove(); }, ms);
  }


  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
  }

});
