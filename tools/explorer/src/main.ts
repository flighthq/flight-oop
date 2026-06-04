import { examples } from 'virtual:explorer-examples';

const STORAGE_KEY = 'explorer-selected-index';
let selectedIndex = 0;

const sidebar = document.getElementById('sidebar')!;
const preview = document.getElementById('preview') as HTMLIFrameElement;

function buildSidebar(): void {
  sidebar.innerHTML = '';

  examples.forEach(({ name }, i) => {
    const btn = document.createElement('button');
    btn.className = 'example-btn' + (i === selectedIndex ? ' selected' : '');
    btn.textContent = name;
    btn.title = name;
    btn.addEventListener('click', () => select(i));
    sidebar.appendChild(btn);
  });
}

function select(index: number): void {
  selectedIndex = index;
  sessionStorage.setItem(STORAGE_KEY, String(index));
  buildSidebar();
  sidebar.querySelector('.selected')?.scrollIntoView({ block: 'nearest' });
  preview.src = `/examples/${examples[index].name}/`;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const next = selectedIndex + (e.key === 'ArrowDown' ? 1 : -1);
    select(Math.max(0, Math.min(examples.length - 1, next)));
  }
});

const saved = parseInt(sessionStorage.getItem(STORAGE_KEY) ?? '0', 10);
buildSidebar();
select(isNaN(saved) || saved >= examples.length ? 0 : saved);
