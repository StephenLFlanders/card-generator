// card-generator.ts (REV 6 – larger portrait, higher placement)

interface CardStats {
  playerName: string;
  mileTime: string;
  fiveMileTime: string;
  tenMileTime: string;
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const cardTemplate = new Image();
let userImage = new Image();
let userImageLoaded = false;

// DOM refs
let imageLoader: HTMLInputElement;
let generateBtn: HTMLButtonElement;
let downloadLnk: HTMLAnchorElement;
let playerNameInput: HTMLInputElement;
let mileTimeInput: HTMLInputElement;
let fiveMileTimeInput: HTMLInputElement;
let tenMileTimeInput: HTMLInputElement;
let customAlertModal: HTMLElement;
let customAlertMessage: HTMLElement;
let customAlertCloseButton: HTMLButtonElement;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const alertUser = (msg: string) => {
  customAlertMessage.textContent = msg;
  customAlertModal.style.display = 'block';
};

/* ───────────────────── Setup */
function setupDOM() {
  canvas = $('cardCanvas');
  ctx = canvas.getContext('2d')!;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  imageLoader = $('imageLoader');
  generateBtn = $('generateBtn');
  downloadLnk = $('downloadLnk');
  playerNameInput = $('playerName');
  mileTimeInput = $('mileTime');
  fiveMileTimeInput = $('fiveMileTime');
  tenMileTimeInput = $('tenMileTime');
  customAlertModal = $('customAlertModal');
  customAlertMessage = $('customAlertMessage');
  customAlertCloseButton = $('customAlertCloseButton');
}

function loadTemplate() {
  cardTemplate.src = './card-template.png';
  cardTemplate.onload = () => ctx.drawImage(cardTemplate, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  cardTemplate.onerror = () => alertUser('Missing template');
}

/* ───────────────────── Upload */
function handleUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = ev => {
    userImage = new Image();
    userImage.onload = () => {
      userImageLoaded = true;
      alertUser('Image ready → Generate');
    };
    userImage.onerror = () => alertUser('Bad image file');
    userImage.src = ev.target!.result as string;
  };
  r.readAsDataURL(file);
}

/* ───────────────────── Stats */
const getStats = (): CardStats => ({
  playerName: playerNameInput.value.toUpperCase(),
  mileTime: mileTimeInput.value,
  fiveMileTime: fiveMileTimeInput.value,
  tenMileTime: tenMileTimeInput.value,
});

function drawStats() {
  const { playerName, mileTime, fiveMileTime, tenMileTime } = getStats();
  ctx.textBaseline = 'top';

  const left = CANVAS_WIDTH * 0.05;
  let y = CANVAS_HEIGHT * 0.05;

  ctx.font = 'bold 76px Arial Black';
  ctx.fillStyle = '#000';
  ctx.fillText(mileTime, left, y);
  y += 70;

  ctx.font = 'bold 36px Arial';
  ctx.fillStyle = '#007bff';
  ctx.fillText(fiveMileTime, left, y);
  y += 32;

  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#333';
  ctx.fillText(tenMileTime, left, y);

  // Name bar
  const barY = CANVAS_HEIGHT * 0.68;
  const barH = 40;
  const pad = 20;

  ctx.font = 'bold 26px Arial Black';
  ctx.textAlign = 'center';
  const barW = ctx.measureText(playerName).width + pad * 2;
  const barX = (CANVAS_WIDTH - barW) / 2;

  ctx.fillStyle = 'rgba(255,255,255,.85)';
  ctx.fillRect(barX, barY - barH / 2, barW, barH);

  ctx.fillStyle = '#000';
  ctx.textBaseline = 'middle';
  ctx.fillText(playerName, CANVAS_WIDTH / 2, barY);
  ctx.textAlign = 'left';
}

/* ───────────────────── Portrait (bigger & higher) */
function drawPortrait() {
  // We want a large circle roughly 45% of canvas width
  const desiredRadius = CANVAS_WIDTH * 0.45; // 180px on 400px canvas

  // Ensure we don’t collide with name bar
  const nameBarY = CANVAS_HEIGHT * 0.68;
  const maxRadiusByHeight = (nameBarY - 20) / 2; // 20px gap
  const radius = Math.min(desiredRadius, maxRadiusByHeight);

  // Position: horizontally ~63% (a bit left of right edge), vertically ~38% of canvas height
  const cx = CANVAS_WIDTH * 0.63;
  const cy = CANVAS_HEIGHT * 0.38;

  const dest = radius * 2;

  // cover-fit calculations
  const scale = Math.max(dest / userImage.naturalWidth, dest / userImage.naturalHeight);
  const sW = dest / scale;
  const sH = dest / scale;
  const sx = (userImage.naturalWidth - sW) / 2;
  const sy = 0; // anchor top

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(userImage, sx, sy, sW, sH, cx - radius, cy - radius, dest, dest);
  ctx.restore();
}

/* ───────────────────── Generate */
function generateCard() {
  if (!userImageLoaded) return alertUser('Upload an image first');

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(cardTemplate, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  drawPortrait();
  drawStats();

  downloadLnk.href = canvas.toDataURL('image/png');
  downloadLnk.classList.remove('hidden');
}

/* ───────────────────── Events */
function bindEvents() {
  imageLoader.addEventListener('change', handleUpload);
  generateBtn.addEventListener('click', generateCard);
  customAlertCloseButton.onclick = () => (customAlertModal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === customAlertModal) customAlertModal.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDOM();
  loadTemplate();
  bindEvents();
});


  
  
