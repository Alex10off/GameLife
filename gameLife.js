let canvas = document.getElementById('cl');
let ctx = canvas.getContext('2d');
let arr = [];
let count = 0;
let timer;

canvas.onclick = function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    arr[y][x] = 1;
    drawField();

}

function goLife() {
    let n = 30,
        m = 30;
    for (let i = 0; i < m; i++) {
        arr[i] = [];
        for (let j = 0; j < n; j++) {
            arr[i][j] = 0;
        }
    }
}

goLife();

function drawField() {
    ctx.clearRect(0, 0, 300, 300);
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            if (arr[i][j] === 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

function startLife() {
    let arr2 = []
    for (let i = 0; i < 30; i++) {
        arr2[i] = [];
        for (let j = 0; j < 30; j++) {
            let neighbors = 0;
            if (arr[fpm(i) - 1][j] == 1) neighbors++; //up
            if (arr[i][fpp(j) + 1] == 1) neighbors++; //right
            if (arr[fpp(i) + 1][j] == 1) neighbors++; //bottom
            if (arr[i][fpm(j) - 1] == 1) neighbors++; //left
            if (arr[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
            if (arr[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
            if (arr[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
            if (arr[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;
            (neighbors == 2 || neighbors == 3) ? arr2[i][j] = 1: arr2[i][j] == 0;
        }
    }
    arr = arr2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = count;
    timer = setTimeout(startLife, 100);
}

function fpm(i) {
    if (i == 0) return 30;
    else return i;
}

function fpp(i) {
    if (i == 29) return -1;
    else return i;
}

document.getElementById('start').onclick = startLife;