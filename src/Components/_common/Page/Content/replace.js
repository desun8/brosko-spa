export default (html, gallery) => {
  const regexp = /<input class="tgallery" data-id="[0-9]+" disabled="disabled" type="text" value="Галерея #[0-9]+" \/>/g;

  // Создаем элементы слайдов
  const createSlides = gallery =>
    gallery
      .map(
        (elm, index) =>
          `<div class="swiper-slide">
            <div class="img" style="background-image: url(../${elm})" data-img-src="${elm}"></div>
          </div>`,
      )
      .join("");

  // Разметка галереи и вставка слайдов
  const replaceStr = (gallery, index) => `
    <div class="swiper-container swiper-container--${index}">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        ${gallery[index] && createSlides(gallery[index])}
      </div>
      
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  `;

  // Удаляем инпут-метку галереи и вставляем уже правильную разметку галереи
  const replace = html.replace(regexp, (match, offset, input) => {
    // находим индекс нужной галереи
    const findId = match.match(/data-id="([0-9]+)"/);
    if (findId === null) return "";
    const galleryId = Number(findId[1]);

    return replaceStr(gallery, galleryId);
  });

  return replace;
};
