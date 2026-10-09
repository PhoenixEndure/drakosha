(() => {
  if (customElements.get('dragon-sprite')) return;
  const META = {
    coffee: { n: 18, w: 228, h: 231 },
    read: { n: 18, w: 228, h: 237 },
    fire: { n: 18, w: 232, h: 197 },
    rest: { n: 30, w: 192, h: 182 },
    peek: { n: 18, w: 236, h: 132 },
    think: { n: 18, w: 220, h: 254 },
  };
  class DragonSprite extends HTMLElement {
    static get observedAttributes() { return ['name', 'size', 'fps', 'mode', 'start', 'end', 'loopstart', 'run']; }
    connectedCallback() {
      if (!this._back) {
        this.style.position = 'relative';
        this._back = document.createElement('div');
        this._top = document.createElement('div');
        this._top.style.position = 'absolute'; this._top.style.left = '0'; this._top.style.top = '0'; this._top.style.opacity = '0';
        this.appendChild(this._back); this.appendChild(this._top);
      }
      this.style.display = 'block';
      this._apply();
    }
    disconnectedCallback() { clearTimeout(this._t); clearTimeout(this._ft); this._key = null; }
    attributeChangedCallback() { if (this._back) this._apply(); }
    _a(n, d) { const v = this.getAttribute(n); return v == null || v === '' ? d : v; }
    _apply() {
      const name = this._a('name', 'read');
      const m = META[name] || META.read;
      const h = +this._a('size', 120);
      const s = h / m.h;
      this._fw = m.w * s;
      for (const el of [this._back, this._top]) Object.assign(el.style, { width: this._fw + 'px', height: h + 'px', backgroundImage: `url(sprites/${name}.png)`, backgroundSize: `${m.w * m.n * s}px ${h}px`, backgroundRepeat: 'no-repeat' });
      this.style.width = this._fw + 'px'; this.style.height = h + 'px';
      const key = [name, h, this._a('fps', 8), this._a('mode', 'loop'), this._a('start', 1), this._a('end', m.n), this._a('loopstart', ''), this._a('run', '')].join('|');
      if (key === this._key) return;
      this._key = key;
      clearTimeout(this._t); clearTimeout(this._ft);
      const from = Math.max(0, +this._a('start', 1) - 1);
      const to = Math.min(m.n - 1, +this._a('end', m.n) - 1);
      const loopFrom = this._a('loopstart', '') === '' ? from : +this._a('loopstart') - 1;
      const once = this._a('mode', 'loop') === 'once';
      // Slower, softened playback: ~60% of the requested rate, 2.5–5 fps, with a cross-fade between frames.
      const fps = Math.max(2.5, Math.min(5, +this._a('fps', 8) * 0.6));
      const dur = 1000 / fps;
      this._fade = Math.round(dur * 0.75);
      this._f = from; this._draw(true);
      if (from === to) return;
      const tick = () => {
        let delay = dur;
        this._f++;
        if (this._f > to) {
          if (once) { this.dispatchEvent(new CustomEvent('dragonend', { bubbles: true })); return; }
          this._f = loopFrom;
        }
        this._draw(false);
        if (this._f === to && !once) delay = dur + 900;
        this._t = setTimeout(tick, delay);
      };
      this._t = setTimeout(tick, dur);
    }
    _draw(instant) {
      const pos = `${-this._f * this._fw}px 0`;
      const top = this._top, back = this._back;
      clearTimeout(this._ft);
      if (instant) { back.style.backgroundPosition = pos; top.style.transition = 'none'; top.style.opacity = '0'; return; }
      top.style.transition = 'none'; top.style.opacity = '0'; top.style.backgroundPosition = pos;
      void top.offsetWidth;
      top.style.transition = `opacity ${this._fade}ms ease-in-out`; top.style.opacity = '1';
      this._ft = setTimeout(() => { back.style.backgroundPosition = pos; top.style.transition = 'none'; top.style.opacity = '0'; }, this._fade + 20);
    }
  }
  customElements.define('dragon-sprite', DragonSprite);
})();
