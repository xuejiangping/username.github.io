(function (root,factory) {
  console.log('没有模块环境，直接挂载在全局对象上')
  root.umdModule = factory();
}(this,function () {
  // 寻找元素
  const findElement = ((lastDoc,frames) => {
    return function (selectors,isAll = false) {
      let res,doc
      if (lastDoc) {
        if (isAll) {
          res = lastDoc.querySelectorAll(selectors)
          if (res.length > 0) return res
        } else {
          res = lastDoc.querySelector(selectors)
          if (res) return res
        }
      }
      for (let i = 0; i < frames.length; i++) {
        try {
          doc = frames[i].document
        } catch (error) {
          continue
        }
        if (isAll) {
          res = doc.querySelectorAll(selectors)
          if (res.length > 0) {
            lastDoc = doc
            return res
          }
        } else {
          res = doc.querySelector(selectors)
          if (res) {
            lastDoc = doc
            return res
          }
        }
      }
      console.log('未找到元素',selectors)
    }
  })(window.document,window.frames);

  return {
    findElement
  }
}))