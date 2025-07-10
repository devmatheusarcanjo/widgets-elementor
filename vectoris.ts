(function () {
  class Carrossel {
    slideAtivo: HTMLElement | null;
    conteudoVisivel: HTMLElement | null;
    carrossel: HTMLElement;
    conteudos: HTMLElement;

    // Delay das animações
    delayMS: number;

    // Timeout para armazenar a referencia dos timeouts de delay
    timeouts: {
      1: NodeJS.Timeout | undefined;
      2: NodeJS.Timeout | undefined;
    };

    constructor() {
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
    buscarElemento(
      selector: string,
      partindo: HTMLElement | Document = document
    ) {
      const elemento: HTMLElement | null = partindo.querySelector(selector);

      if (!elemento) {
        throw new Error(
          `Erro ao buscar Elemento html. Elemento (  ${selector}  ) não encontrato`
        );
      }

      return elemento;
    }

    // Função para exibir o conteudo de uma opcao
    exibirConteudo(conteudo: HTMLElement, slideClicado: HTMLElement) {
      clearTimeout(this.timeouts[1]);
      clearTimeout(this.timeouts[2]);

      if (this.conteudoVisivel === conteudo) return;
      const conteudoVisivel = this.conteudoVisivel;

      if (conteudoVisivel) {
        conteudoVisivel.style.opacity = '0';

        // Aguarda o tempo e remove o elemento
        setTimeout(() => {
          console.log(!conteudoVisivel || !this.delayMS);
          if (!conteudoVisivel || !this.delayMS) return;
          conteudoVisivel.style.display = 'none';
        }, this.delayMS);
      }

      if (this.slideAtivo) {
        const carrossel: HTMLElement | null = document.querySelector(
          '[data-elemento-carrossel]'
        );

        if (!carrossel)
          return console.error(
            'Carrossel nao encontrado para remover estilos dos filhos'
          );

        const todosSlides: HTMLDivElement[] = Array.from(
          carrossel.querySelectorAll('.swiper-slide')
        );

        if (todosSlides)
          todosSlides.forEach((element: HTMLElement) => {
            element.classList.remove('slide-ativo');
          });
      }

      slideClicado.classList.add('slide-ativo');

      // Aguarda o tempo exibe o elemento
      this.timeouts[1] = setTimeout(() => {
        conteudo.style.display = 'flex';
        conteudo.style.opacity = '1';
      }, this.delayMS);

      this.conteudoVisivel = conteudo;
      this.slideAtivo = slideClicado;
    }

    // Callback dos cliques
    aposElementoSelecionado = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target)
        return console.error(
          'Item do carrossel nao encontrado. Possivelmente esta sem o data-id'
        );

      const swiperSlide: HTMLElement | null = target.closest('.swiper-slide');

      if (!swiperSlide)
        return console.error(
          'Item do carrossel nao encontrado. Possivelmente esta sem o data-id'
        );

      const idSlide = swiperSlide.dataset.slide;

      if (!idSlide) return console.error('Slide sem o atributo data-slide');

      const conteudoDoSlideClicado = this.buscarElemento(
        `[data-sessao='${+idSlide}']`,
        this.conteudos
      );

      this.exibirConteudo(conteudoDoSlideClicado, swiperSlide);
    };

    start = () => {
      if (this.conteudos)
        this.conteudos
          .querySelectorAll('[data-sessao]')
          .forEach((sessao: any) => {
            if (sessao.dataset.sessao === '1') {
              this.conteudoVisivel = sessao;
            } else {
              sessao.style.display = 'none';
            }
          });

      //  Ativar o item 1
      const slide1 = this.carrossel.querySelector("[data-slide='1']") as
        | HTMLElement
        | undefined;
      if (slide1) {
        slide1.classList.add('slide-ativo');
        this.slideAtivo = slide1;
      }

      this.carrossel.addEventListener('click', this.aposElementoSelecionado);
    };
  }

  const carrossel = new Carrossel();
  carrossel.start();
})();
