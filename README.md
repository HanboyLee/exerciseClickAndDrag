# JS基礎篇--瞭解JS的clientX、pageX、screenX等方法來獲取滑鼠坐標詳解

## ****方法介紹****

---

關於js滑鼠事件綜合各大瀏覽器能獲取到坐標的屬性總共以下五種：

- event.clientX/Y
- **event.pageX/Y**
- **event.offsetX/Y**
- **event.layerX/Y**
- **event.screenX/Y**

### **clientX/Y**

`clientX/Y`獲取到的是觸發點相對瀏覽器可視區域左上角距離，不隨頁面滾動而改變。相容性：所有瀏覽器均支援

### ****pageX/Y****

`pageX/Y` 獲取到的是觸發點相對文件區域左上角距離，會隨著頁面滾動而改變

相容性：除IE6/7/8不支援外，其餘瀏覽器均支援

### ****offsetX/Y****

`offsetX/Y`獲取到是觸發點相對被觸發dom的左上角距離，不過左上角基準點在不同瀏覽器中有區別，其中在IE中以內容區左上角為基準點不包括邊框，如果觸發點在邊框上會返回負值，而chrome中以邊框左上角為基準點。

### ****layerX/Y****

`layerX/Y`獲取到的是觸發點相對被觸發dom左上角的距離，數值與offsetX/Y相同，這個變數就是firefox用來替代offsetX/Y的，基準點為邊框左上角，但是有個條件就是，被觸發的dom需要設定為position:relative或者position:absolute，否則會返回相對html文件區域左上角的距離

### ****screenX/Y****

`screenX/Y`獲取到的是觸發點相對顯示器螢幕左上角的距離，不隨頁面滾動而改變。

相容性：所有瀏覽器均支援

![Untitled](JS%E5%9F%BA%E7%A4%8E%E7%AF%87--%E7%9E%AD%E8%A7%A3JS%E7%9A%84clientX%E3%80%81pageX%E3%80%81screenX%E7%AD%89%E6%96%B9%E6%B3%95%E4%BE%86%E7%8D%B2%E5%8F%96%E6%BB%91%E9%BC%A0%E5%9D%90%E6%A8%99%E8%A9%B3%E8%A7%A3%200e3aa810a5fa4948b235ea182e78723c/Untitled.png)

## ****滑鼠點選位置坐標****

---

### ****相對於螢幕****

如果是涉及到滑鼠點選確定位置相對比較簡單，獲取到滑鼠點選事件後，事件`screenX，screenY`
獲取的是點選位置相對於螢幕的左邊距與上邊距，不考慮`iframe`
因素，不同瀏覽器下表現的還算一致。

```jsx
function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.screenX,'y':screenY}
}
```

### ****相對瀏覽器窗口****

簡單程式碼即可實現，然而這是還不夠，因為絕大多數情況下我們希望獲取滑鼠點選位置相對於瀏覽器窗口的坐標，event的clientX，clientY屬性分別表示滑鼠點選位置相對於文件的左邊距，上邊距。於是類似的我們寫出了這樣的程式碼

```jsx
function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.clientX,'y':clientY}
}
```

### ****相對文件****

簡單測試也沒什麼問題，但是clientX與clientY獲取的是相對於當前螢幕的坐標，忽略頁面滾動因素，這在很多條件下很有用，但當我們需要考慮頁面滾動，也就是相對於文件（body元素）的坐標時怎麼辦呢？加上滾動的位移就可以了，下邊我們試試怎麼計算頁面滾動的位移。

其實在Firefox下問題會簡單很多，因為Firefox支援屬性pageX,與pageY屬性，這兩個屬性已經把頁面滾動計算在內了。

在Chrome可以通過`document.body.scrollLeft`，`document.body.scrollTop`計算出頁面滾動位移，而在IE下可以通過`document.documentElement.scrollLeft` ，`document.documentElement.scrollTop`

```jsx
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}
```

![Untitled](https://segmentfault.com/img/bVbgVPA?w=1366&h=768)
