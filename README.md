# 護樹臺大

[Link](https://rhodanthe1116.github.io/final/)

## 簡介

改造原本的[臺大樹語](https://map.ntu.edu.tw/ntutree/index.htm)網站

## 使用說明

- 直接點擊地圖上的樹木 icon 可以查看樹木的簡介，之後可以更進一步點擊「保護我」，或是「了解更多」。點擊「保護我」將顯示捐款表單，點擊「了解更多」後，將會看到詳細資訊，可以在上面瀏覽樹種百科以及樹的個資
- 若是想要依分類搜尋樹木，可以點擊畫面左邊的浮動按鈕群，可以依樹種、季節、校區等進行分類。不過目前只有全部常見樹木跟季節有作用。

## 技術運用、客製化元件與 Dependencies

主要使用 Google Map, React, Material-ui 來完成主要功能。

### UI/UX 設計

一個前端網站最重要的就介面好不好看。根據美即好用原則（Aesthetic–usability effect），好看的介面更勝過複雜的功能，所以我整體非常注重如何用程式碼來實作介面。整體使用 [Material-UI](https://material-ui.com/) 框架，搭配一些客製元件。其中字型、色盤等都有精心調整過。

### [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)

研究起來最複雜的功能，Google 的 Api 都寫得很複雜，文件也很複雜，剛開始用弄懂花了很大的心力。後來使用了 [google-map-react](https://github.com/google-map-react/google-map-react) 來加速開發，弄懂也花了一些時間。除此之外，還要擔心 Api Key 的安全性，避免被別人濫用，放到 Github Page 上好像滿危險的。

### 樹的資料

用 fetch 從舊的網站透過[原本的 api](https://map.ntu.edu.tw/ntutree/permitAll/treeDb/listAll) 拿了樹的資料（自己架了一個 [cors-anywhere](https://cors-anywhere.herokuapp.com/)） ，不過只拿得到樹種資料，拿不到其他詳細的資料，連經緯度也拿不到，所以有些資料是隨機生成的。

### Wikipedia api

因為沒有樹的簡介，所以用 fetch 從 wikipedia 抓簡介，同樣加了 cors-anywhere，不過有些樹在維基百科上沒有資料，所以會顯示預設模板。

### 自製元件：Floating Action Menu (FAM)

除了使用 Material-ui 提供的元件外，我自己創造了一個 Floating Action Menu(FAM)，主要基於 [FAB](https://material-ui.com/components/floating-action-button/#floating-action-button) 跟 [Speed Dial](https://material-ui.com/components/speed-dial/#speed-dial) 的延伸，FAM 正是畫面左邊的幾個導覽圈圈，作為篩選樹木用。

### 懸浮資訊卡

懸浮資訊卡（hover 時會出現的簡介）的功能也是做了一段時間，本來想要直接寫在 icon 的下面，但是這樣做有很多缺點，最後決定用 [Popper（基於 Popper.js）](https://material-ui.com/components/popper/#popper) 來實現，效果滿好的。

### Carousel

比較了很多 React 的 carousel，最後選用跟 React 比較合又比較好看的 [react-responsive-carouse](https://www.npmjs.com/package/react-responsive-carousel)

### Image API

因為拿不到樹的資料，當然也拿不到圖片，只好用 [unsplash](https://source.unsplash.com/345x200/?tree) 取得隨機圖片，滿間單的

### 樹的篩選系統

左方的 FAM 為樹的篩選系統，本來想直接 call api 篩選，可是沒辦法利用 api 篩選，只好自己做本地篩選，滿簡單的，主要是狀態的管理。

### 用 jQuery 做 multiline text overflow ellipsis

維基百科來的樹的資料可能會太多，為了防止他爆出，讓結尾加上...

### Responsive

有做基本的 Responsive，主要是預設用電腦開，但如果用手機看也能有基本的操作。

## 特色、亮點

- 需要串接真實且複雜的 api，如 Google Maps Api、Wikipedia api、臺大樹語 api 等。
- 以實際情況為導向的程式
- 需要處理龐大的資料，同時不讓網頁速度變慢
- 整體細緻度高，除了外觀基本的間距適當、整齊之外，也花了很多時間在想排版、配色、風格等，找 icon 也花了不少時間，主要想讓整體風格像遊戲風，同時也有一致性。同時也兼顧使用者體驗，比如讀取資料的 ProgressBar，還有圖片的 [LazyLoading](https://mui.wertarbyte.com/#material-ui-image)，同時也有做例外處理，若樹的資料沒有下載成功，會顯示 SnackBar 等。

## 參考資料

- [臺大樹語](https://map.ntu.edu.tw/ntutree/index.htm)
- [cors-anywhere](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe)
- [wiki api](https://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary)
- [unsplash](https://source.unsplash.com/345x200/?tree)
- [Material-UI](https://material-ui.com/)
- [google-map-react](https://github.com/google-map-react/google-map-react)
- [react-responsive-carouse](https://www.npmjs.com/package/react-responsive-carousel)
- [material-ui-image](https://mui.wertarbyte.com/#material-ui-image)
