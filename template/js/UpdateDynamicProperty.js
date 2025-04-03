// Универсальная функция для обновления любого свойства CSS в зависимости от ширины окна с любыми единицами изменения
function updateDynamicProperty(
    propertyName,
    minValue,
    maxValue,
    unit,
    minWidth,
    maxWidth
) {
    const windowWidth = Math.min(window.innerWidth, maxWidth);

    let value =
        minValue +
        ((windowWidth - minWidth) * (maxValue - minValue)) /
            (maxWidth - minWidth);
    document.documentElement.style.setProperty(
        `--${propertyName}`,
        `${value}${unit}`
    ); // unit - единица измерения
}
// динамическое изменение margin-right в .nav__icon--open
window.addEventListener("load", () => {
    updateDynamicProperty("margin-right", 6, 47, "rem", 360, 1023);
});

window.addEventListener("resize", () => {
    updateDynamicProperty("margin-right", 6, 47, "rem", 360, 1023);
});
