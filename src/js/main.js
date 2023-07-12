window.addEventListener('DOMContentLoaded', () => {
    // overlay
    const btnAbout = document.querySelector('.btn_about');
    let overlay = document.querySelector('.about__overlay');

    overlay.classList.add('shown');

    function closeOverlay() {
        overlay.classList.add('hide');
        overlay.classList.remove('shown');
        btnAbout.style.position = 'relative';
        btnAbout.style.top = '30px';
        btnAbout.innerHTML = 'Скрыть';
    }

    function openOverlay() {
        overlay.classList.add('shown');
        overlay.classList.remove('hide');
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
          nextButton = document.querySelector('.arrows__arrow-next'),
          closeButton = document.querySelector('.services__btn_close');

          let tnsSliders = [];

    function initializeSlider(index = 0) {
        sliders[index].classList.add('services__slider_active');
        tabs[index].classList.add('services__tab_active');

        tnsSliders[index] = tns({
            container: sliders[index],
            items: 2,
            gutter: 50,
            center: true,
            autoWidth: true,
            mouseDrag: true,
            nav: false,
            speed: 1000,
            prevButton: prevButton,
            nextButton: nextButton,
            responsive: {
                640: {
                    edgePadding: 20,
                    gutter: 20,
                    items: 1
                },
                700: {
                    gutter: 30
                },
                900: {
                    items: 2
                }
            }
        });
    }

    initializeSlider();


    closeButton.addEventListener('click', () => {
        sliderContainer.classList.add('services__sliders_hidden');
        detailButtons.forEach(button => {
            button.textContent = 'Подробнее';
        });
    });
    // Добавляем обработчик события для каждой кнопки "Подробнее"
    detailButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            // Если слайдер уже активен, скрываем его и показываем блок
            if (sliders[index].classList.contains('services__slider_active')) {
                sliders[index].classList.remove('services__slider_active');
                sliderContainer.classList.add('services__sliders_hidden');
                button.textContent = 'Подробнее';
            } else {
                // Скрываем все слайдеры и снимаем активный класс с табов

                sliders.forEach(function (slider) {
                    slider.classList.remove('services__slider_active');
                });

                tabs.forEach(function (tab) {
                    tab.classList.remove('services__tab_active');
                });

                // Показываем соответствующий слайдер и активируем выбранный таб
                sliders[index].classList.add('services__slider_active');
                tabs[index].classList.add('services__tab_active');


                if (tnsSliders[index]) {
                    // tnsSliders[index].destroy();
                    // tnsSliders[index] = tnsSliders[index].rebuild();
                    tnsSliders[index].refresh();
                    
                } else {
                    initializeSlider(index);
                }



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
    
    //slider #2

    const slidersExp = document.querySelector('.experience__sliders'),
          prevButtonExp = document.querySelector('.arrows__arrow-prev-exp'),
          nextButtonExp = document.querySelector('.arrows__arrow-next-exp');

          const tnsSliderExp = tns({
            container: slidersExp,
			nav: false,
            items: 1,
            center: true,
            mouseDrag: true,
            speed: 1000,
            prevButton: prevButtonExp,
            nextButton: nextButtonExp
        });


        // slider 3

        

        const slidersLast = document.querySelector('.lastslider__slider'),
              sliderContainerLast = document.querySelector('.lastslider__sliders'),
              closeButtonLast = document.querySelector('.lastslider__btn'),
              prevButtonLast = document.querySelector('.lastslider__arrow-prev'),
              nextButtonLast = document.querySelector('.lastslider__arrow-next');


        const tnsSlider = tns({
            container: slidersLast,
			nav: false,
            items: 2,
            gutter: 50,
            center: true,
            autoWidth: true,
            mouseDrag: true,
            speed: 1000,
            prevButton: prevButtonLast,
            nextButton: nextButtonLast, 
            responsive: {
                640: {
                  edgePadding: 20,
                  gutter: 20,
                  items: 1
                },
                700: {
                  gutter: 30
                },
                900: {
                  items: 2
                }
              }
        });

        closeButtonLast.addEventListener('click', () => {
            sliderContainerLast.classList.add('lastslider__sliders_hidden');
        });
    

    //modal
    
    const containerModal = document.querySelector('.overlay'),
        consultation = document.querySelector('#consultation'),
        buttonSubmit = document.querySelector('.btn_modal'),
        buttonsConsultation = document.querySelectorAll('[data-modal=consultation]');

    function openModal() {
        containerModal.style.visibility = 'visible';
        containerModal.classList.add('show');
        consultation.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    buttonsConsultation.forEach(button => {
        button.addEventListener('click', openModal)
    });

    containerModal.addEventListener('click', closeModal);

    buttonSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        consultation.classList.remove('show');
        const thanksModal = document.createElement('div');
        thanksModal.innerHTML = `
        <div class="modal modal_mini" id="thanks">
        <div class="modal__close">&times;</div>
        <div class="modal__subtitle">Спасибо за вашу заявку!</div>
        <div class="modal__descr">Наш менеджер свяжется с вами  <br> в ближайшее время!</div>
            </div>
        `
        containerModal.append(thanksModal)
        setTimeout(() => {
            onClose()
            thanksModal.remove()
        }, 3000);
    });

    function closeModal(event) {
        if (event.target.classList.contains('modal__close')) {
            onClose()
        }
    }

    function onClose() {
        document.body.style.overflow = '';
        containerModal.style.visibility = 'hidden';
        containerModal.classList.remove('show');
        consultation.classList.remove('show');   
    }

    
});

