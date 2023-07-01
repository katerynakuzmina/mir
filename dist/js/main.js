window.addEventListener('DOMContentLoaded', () => {
    // overlay
    const btnAbout = document.querySelector('.btn_about');
    let overlay = document.querySelector('.about__overlay');

    overlay.classList.add('shown');

    function closeOverlay() {
        overlay.classList.add('hidden');
        overlay.classList.remove('shown');
        btnAbout.style.position = 'relative';
        btnAbout.style.top = '30px';
        btnAbout.innerHTML = 'Скрыть';
    }

    function openOverlay() {
        overlay.classList.add('shown');
        overlay.classList.remove('hidden');
        btnAbout.style.position = 'absolute';
        btnAbout.style.top = '190px';
        btnAbout.innerHTML = 'Подробнее';
    }
    
    btnAbout.addEventListener('click', () => {
        if (overlay.classList.contains('shown')) {
            closeOverlay();
        } else {
            openOverlay();
        }

    });

    // slider

    const detailButtons = document.querySelectorAll('.services__tab .services__btn'),
          sliders = document.querySelectorAll('.services__slider'),
          sliderContainer = document.querySelector('.services__sliders'),
          tabs = document.querySelectorAll('.services__tab'),
          prevButton = document.querySelector('.arrows__arrow-prev'),
          nextButton = document.querySelector('.arrows__arrow-next');
          

    // По умолчанию активируем слайдер и таб "Быстрые решения"
    sliders[0].classList.add('services__slider_active');
    tabs[0].classList.add('services__tab_active');

    let activeSlideIndex = 1;
    let totalSlides = 1;

    const tnsSlider = tns({
        container: sliders[0],
        items: 2,
        gutter: 50,
        center: true,
        autoWidth: true,
        mouseDrag: true,
        speed: 700,
        prevButton: prevButton,
        nextButton: nextButton,
        onInit: function (info) {
            activeSlideIndex = info.index + 1;
            totalSlides = info.slideCount;
            updateSliderCounter(activeSlideIndex, totalSlides);
        },
        onIndexChanged: function (info) {
            activeSlideIndex = info.index + 1;
            updateSliderCounter(activeSlideIndex, totalSlides);
        }
    });

    // Добавляем обработчик события для каждой кнопки "Подробнее"
    detailButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
             // Если слайдер уже активен, скрываем его и показываем блок
            if (sliders[index].classList.contains('services__slider_active')) {
                sliders[index].classList.remove('services__slider_active');
                sliderContainer.classList.add('services__sliders_hidden');
                button.textContent = 'Подробнее';
            } else {
            // Скрываем все слайдеры и снимаем активный класс с табов
                sliders.forEach(function(slider) {
                    slider.classList.remove('services__slider_active');
                });

                tabs.forEach(function(tab) {
                    tab.classList.remove('services__tab_active');
                });            

                // Показываем соответствующий слайдер и активируем выбранный таб
                sliders[index].classList.add('services__slider_active');
                tabs[index].classList.add('services__tab_active');

                
                // Инициализируем только выбранный слайдер Tiny Slider с обновленными значениями
                

                const tnsSlider = tns({
                    container: sliders[index],
                    items: 2,
                    gutter: 50,
                    center: true,
                    autoWidth: true,
                    mouseDrag: true,
                    speed: 700,
                    prevButton: prevButton,
                    nextButton: nextButton,
                    onInit: function (info) {
                        activeSlideIndex = info.index + 1;
                        totalSlides = info.slideCount;
                        updateSliderCounter(activeSlideIndex, totalSlides);
                    },
                    onIndexChanged: function (info) {
                        activeSlideIndex = info.index + 1;
                        updateSliderCounter(activeSlideIndex, totalSlides);
                    }
                });
                updateButtonText();

                // Скрываем блок с слайдерами
                sliderContainer.classList.remove('services__sliders_hidden');
                button.textContent = 'Скрыть';
            }
        });
    });

    function updateButtonText() {
        detailButtons.forEach(function(button, index) {
            if (tabs[index].classList.contains('services__tab_active')) {
                button.textContent = 'Скрыть';
            } else {
                button.textContent = 'Подробнее';
            }
        });
    }
      // Вызываем функцию для установки текста кнопки при загрузке страницы
    updateButtonText();

    function updateSliderCounter(activeSlideIndex, totalSlides) {
        const currentElement = document.getElementById('current');
        const totalElement = document.getElementById('total');
        
        currentElement.textContent = activeSlideIndex.toString().padStart(2, '0');
        totalElement.textContent = totalSlides.toString().padStart(2, '0');
    }
      


    
});