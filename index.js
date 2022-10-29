const docText = document.querySelector(".docText");
const boxText = document.querySelector(".boxText");
const dragPageText = document.querySelector(".dragPageText");
const moveBlueText = document.querySelector(".moveBlueText");

const box = document.querySelector(".box");
const dragBox = document.querySelector(".dragBox");
const boxLeft = box.offsetLeft;
const boxRight = boxLeft + box.clientWidth;
const boxtop = box.offsetTop;
const boxBottom = boxtop + box.clientHeight;
// 紅色box
boxText.textContent = `
紅色框
boxLeft:${boxLeft},
boxtop:${boxtop},
boxRight（boxLeft + width）:${boxRight},
boxBottom (同上):${boxBottom}`;

/**
  拖動時
  - 開始 dragstart
  - 開始 dragstart
  - 開始 dragstart

  進入區域 
    -進入時 dragenter
    -進入後 dragover
    -進入離開 dragleave
    -進入放置 drop
  
  滑鼠按下 mousedown
  滑鼠移動 mousemove
  滑鼠放開 mouseup
 */

dragBox.addEventListener(
    "mousedown",
    (e) => {
        console.log(e);
        // console.log(e.offsetX, "e.offsetLeft");
        // console.log(e.offsetY, "e.offsetTop");
        // console.log(e.clientX, "e.clientX");
        // console.log(e.clientY, "e.clientY");
        // console.log(e.pageX - e.offsetX, "e.pageX");
        // console.log(e.pageY - e.offsetY, "e.pageY");
        dragPageText.textContent = `
        藍色框
        dragBox的pageX:${e.pageX},
        dragBox的pageY:${e.pageY},
        dragBox的offsetX:${e.offsetX},
        dragBox的offsetY:${e.offsetY},
        dragBox的pageX - dragBox的offsetX （距離doc與藍色框的left位子）:${e.pageX - e.offsetX},
        dragBox的pageY - dragBox的offsetY （距離doc與藍色框的top位子）:${e.pageY - e.offsetY},
        
        `;
        const left = e.pageX - boxLeft - dragBox.offsetLeft;
        const top = e.pageY - boxtop - dragBox.offsetTop;

        const moving = (e) => {
            docText.textContent = `
            doc點擊left側距離e.pageX:${e.pageX}
            doc點擊top側距離e.pageY:${e.pageY}
            `;
            const moveLeft = e.pageX - left - boxLeft;
            const moveTop = e.pageY - top - boxtop;
            moveBlueText.textContent = `
            藍色框移動
            公式：doc點擊距離（e.pageX） - 紅色框與doc距離 - 藍色框與紅色框的距離（Ｙ軸同理）
            moveLeft:${moveLeft}
            moveTop:${moveTop}
            `;
            dragBox.textContent = `X:${moveLeft},Y:${moveTop}`;
            dragBox.style.left = `${moveLeft}px`;
            dragBox.style.top = `${moveTop}px`;
            // console.log(boxRight, "boxRight", e.clientX + left);

            const edges = [
                boxLeft > e.clientX - left,
                boxRight < e.clientX + left,
                boxtop > e.clientY - top,
                boxBottom < e.clientY + top,
            ];

            edges.forEach((isEdge) => {
                if (isEdge) {
                    console.log(isEdge);
                    document.removeEventListener("mousemove", moving, false);
                }
            });

            // if (moveTop < boxtop || moveLeft > boxBottom) {
            //     document.removeEventListener("mousemove", moving, false);
            // }
        };
        document.addEventListener("mousemove", moving, false);
        document.addEventListener(
            "mouseup",
            () => {
                document.removeEventListener("mousemove", moving, false);
            },
            false
        );
    },
    false
);
