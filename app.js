document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const clearButton = document.getElementById('clearButton');
    const messageBox = document.getElementById('messageBox');


    // 开始寻宝事件
    startButton.addEventListener('click', () => {
        loadLocations();  // 在点击开始按钮时加载文本文件
        findTreasureWithAsyncAwait(); // 开始寻宝
    });

    // 清除记录事件
    clearButton.addEventListener('click', clearConsole);
});

// logToMessageBox 函数用于在消息框中输出信息
function logToMessageBox(message, isError = false) {
    const messageBox = document.getElementById('messageBox');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = isError ? 'log-entry error' : 'log-entry';
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

// 宝藏寻找的异步函数
async function findTreasureWithAsyncAwait() {
    const pathPoints = [];

    try {
        const clue = await TreasureMap.getInitialClue();
        logToMessageBox(clue);
        pathPoints.push({ x: 250, y: 0 });
        moveHunter(250, 0, 'libraryImage');
        drawPath(pathPoints);

        const location = await TreasureMap.decodeAncientScript(clue);
        logToMessageBox(location);
        pathPoints.push({ x: 100, y: 0 });
        moveHunter(100, 0, 'templeImage');
        drawPath(pathPoints);

        const box = await TreasureMap.searchTemple(location);
        logToMessageBox(box);
        pathPoints.push({ x: 600, y: 100 });
        moveHunter(600, 100, 'BoxImage');
        drawPath(pathPoints);

        const puzzleSolved = await TreasureMap.solvePuzzle(box);
        logToMessageBox(puzzleSolved);
        pathPoints.push({ x: 350, y: 200 });
        moveHunter(350, 200, 'Box1Image');
        drawPath(pathPoints);

        const key1 = await TreasureMap.findKey("北边的密室");
        logToMessageBox(key1);
        pathPoints.push({ x: 150, y: 150 });
        moveHunter(150, 150, 'northChamberImage');
        drawPath(pathPoints);

        const key2 = await TreasureMap.findKey("南边的森林");
        logToMessageBox(key2);
        pathPoints.push({ x: 50, y: 150 });
        moveHunter(50, 150, 'southForestImage');
        drawPath(pathPoints);

        const key3 = await TreasureMap.findKey("东边的废墟");
        logToMessageBox(key3);
        pathPoints.push({ x: 500, y: 50 });
        moveHunter(500, 50, 'eastRuinsImage');
        drawPath(pathPoints);

        const boxOpened = await TreasureMap.useKeysToOpenBox([key1, key2, key3]);
        logToMessageBox(boxOpened);
        pathPoints.push({ x: 200, y: 150 });
        moveHunter(200, 150, 'treasureBoxImage');
        drawPath(pathPoints);

        const treasure = await TreasureMap.openTreasureBox();
        logToMessageBox(treasure);
        pathPoints.push({ x: 200, y: 300 });
        moveHunter(200, 300);
        drawPath(pathPoints);

        logToMessageBox("寻宝之旅圆满结束，恭喜你成为了传奇探险家！");
    } catch (error) {
        logToMessageBox(error, true);
        logToMessageBox("寻宝之旅虽然艰难，但勇气和智慧会引领你走向新的冒险。");
    }
}

// 移动猎人
function moveHunter(x, y, locationId) {
    const treasureHunterImage = document.getElementById('treasureHunter');
    treasureHunterImage.style.left = `${x}px`;
    treasureHunterImage.style.top = `${y}px`;
    document.querySelectorAll('.location-image').forEach(img => img.style.display = 'none');
    if (locationId) {
        const locationImage = document.getElementById(locationId);
        if (locationImage) {
            locationImage.style.display = 'block';
            locationImage.style.left = `${x}px`;
            locationImage.style.top = `${y}px`;
        }
    }
}

// 绘制路径
function drawPath(points) {
    const pathContainer = document.getElementById('path');
    pathContainer.innerHTML = "";

    for (let i = 0; i < points.length - 1; i++) {
        const startX = points[i].x + 10;
        const startY = points[i].y + 10;
        const endX = points[i + 1].x + 10;
        const endY = points[i + 1].y + 10;

        const pathLine = document.createElement('div');
        pathLine.className = 'path-line';

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

        pathLine.style.width = length + 'px';
        pathLine.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)`;
        pathLine.style.left = `${startX}px`;
        pathLine.style.top = `${startY}px`;

        pathContainer.appendChild(pathLine);
    }
}

// 清除记录
function clearConsole() {
    const consoleDiv = document.getElementById('console');
    const messageBoxDiv = document.getElementById('messageBox');
    const pathDiv = document.getElementById('path');
    const hunterDiv = document.getElementById('treasureHunter');

    pathDiv.innerHTML = '';
    moveHunter(0, 0);
    messageBoxDiv.innerHTML = '';
}

// TreasureMap 类定义
class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.2) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static solvePuzzle(puzzle) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!puzzle) {
                    reject("没有谜题可以解决!");
                }
                resolve("谜题解决成功! 宝箱的第一道锁被打开了，宝箱还有三道锁，还需要三把钥匙，宝箱才能被开启...");
            }, 1500);
        });
    }

    static findKey(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("没有找到钥匙，这里什么也没有...");
                }
                resolve(`在${location}找到了一把钥匙！`);
            }, 1500);
        });
    }

    static useKeysToOpenBox(keys) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("使用三把钥匙成功打开了宝箱！");
            }, 1000);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }
}
