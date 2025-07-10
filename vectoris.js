(function () {
    var Carrossel = /** @class */ (function () {
        function Carrossel() {
            var _this = this;
            // Callback dos cliques
            this.aposElementoSelecionado = function (event) {
                var target = event.target;
                if (!target)
                    return console.error('Item do carrossel nao encontrado. Possivelmente esta sem o data-id');
                var swiperSlide = target.closest('.swiper-slide');
                if (!swiperSlide)
                    return console.error('Item do carrossel nao encontrado. Possivelmente esta sem o data-id');
                var idSlide = swiperSlide.dataset.slide;
                if (!idSlide)
                    return console.error('Slide sem o atributo data-slide');
                var conteudoDoSlideClicado = _this.buscarElemento("[data-sessao='".concat(+idSlide, "']"), _this.conteudos);
                _this.exibirConteudo(conteudoDoSlideClicado, swiperSlide);
            };
            this.start = function () {
                if (_this.conteudos)
                    _this.conteudos
                        .querySelectorAll('[data-sessao]')
                        .forEach(function (sessao) {
                        if (sessao.dataset.sessao === '1') {
                            _this.conteudoVisivel = sessao;
                        }
                        else {
                            sessao.style.display = 'none';
                        }
                    });
                //  Ativar o item 1
                var slide1 = _this.carrossel.querySelector("[data-slide='1']");
                if (slide1) {
                    slide1.classList.add('slide-ativo');
                    _this.slideAtivo = slide1;
                }
                _this.carrossel.addEventListener('click', _this.aposElementoSelecionado);
            };
            this.slideAtivo = null;
            this.carrossel = this.buscarElemento('[data-elemento-carrossel]');
            this.conteudos = this.buscarElemento('[data-slide-contents]');
            this.conteudoVisivel = null;
            this.buscarElemento = this.buscarElemento;
            this.delayMS = 500;
            this.timeouts = {
                1: undefined,
                2: undefined,
            };
            // Aplicar o evento que da start no carrossel
            this.carrossel.addEventListener('click', this.aposElementoSelecionado);
        }
        // Selecionar um elemento com base em um seletor e um elemento para partir dele
        Carrossel.prototype.buscarElemento = function (selector, partindo) {
            if (partindo === void 0) { partindo = document; }
            var elemento = partindo.querySelector(selector);
            if (!elemento) {
                throw new Error("Erro ao buscar Elemento html. Elemento (  ".concat(selector, "  ) n\u00E3o encontrato"));
            }
            return elemento;
        };
        // Função para exibir o conteudo de uma opcao
        Carrossel.prototype.exibirConteudo = function (conteudo, slideClicado) {
            var _this = this;
            clearTimeout(this.timeouts[1]);
            clearTimeout(this.timeouts[2]);
            if (this.conteudoVisivel === conteudo)
                return;
            var conteudoVisivel = this.conteudoVisivel;
            if (conteudoVisivel) {
                conteudoVisivel.style.opacity = '0';
                // Aguarda o tempo e remove o elemento
                setTimeout(function () {
                    console.log(!conteudoVisivel || !_this.delayMS);
                    if (!conteudoVisivel || !_this.delayMS)
                        return;
                    conteudoVisivel.style.display = 'none';
                }, this.delayMS);
            }
            if (this.slideAtivo) {
                var carrossel_1 = document.querySelector('[data-elemento-carrossel]');
                if (!carrossel_1)
                    return console.error('Carrossel nao encontrado para remover estilos dos filhos');
                var todosSlides = Array.from(carrossel_1.querySelectorAll('.swiper-slide'));
                if (todosSlides)
                    todosSlides.forEach(function (element) {
                        element.classList.remove('slide-ativo');
                    });
            }
            slideClicado.classList.add('slide-ativo');
            // Aguarda o tempo exibe o elemento
            this.timeouts[1] = setTimeout(function () {
                conteudo.style.display = 'flex';
                conteudo.style.opacity = '1';
            }, this.delayMS);
            this.conteudoVisivel = conteudo;
            this.slideAtivo = slideClicado;
        };
        return Carrossel;
    }());
    var carrossel = new Carrossel();
    carrossel.start();
})();
