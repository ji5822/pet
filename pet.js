if (!window.ruoyu_run) {
  window.ruoyu_run = true;
  const ruoyu_textarea = document.querySelector(
    "#chat-control-panel-vm textarea"
  );
  const ruoyu_button = document.querySelector("#chat-control-panel-vm button");
  if (
    window.location.host === "live.bilibili.com" &&
    ruoyu_textarea &&
    ruoyu_button
  ) {
    const t = prompt("请输入弹幕间隔分钟数，例如：1");
    if (!isNaN(t) && t.trim() !== "") {
      const ruoyu_evt = new InputEvent("input", {
        inputType: "insertText",
        data: "insertText",
        dataTransfer: null,
        isComposing: false,
      });

      let ruoyu_n = 0;
      const ruoyu_send = ({ msg = "", loop = true } = {}) => {
        ruoyu_textarea.value = msg || (ruoyu_n++ % 2 === 0 ? "修炼" : "突破");
        ruoyu_textarea.dispatchEvent(ruoyu_evt);
        ruoyu_button.click();
        if (loop) {
          setTimeout(ruoyu_send, 1000 * 60 * t);
        }
      };
      ruoyu_send({ loop: false, msg: "修炼" });
      setTimeout(ruoyu_send, 1000 * 5);
    } else {
      alert("只允许输入数字，点击确定后页面自动刷新，请重新运行书签");
      location.reload();
    }
  } else {
    alert("当前页面不是哔哩哔哩直播页面");
  }
} else {
  alert("不要重复运行");
}
