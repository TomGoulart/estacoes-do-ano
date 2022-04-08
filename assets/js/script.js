var pagesName = []
$('.page').each( function() {
    pagesName.push(`#${this.id}`)
})

var pages = [true, false, false, false]
var onTransition = false;

var seasonName = ['primavera','verao','outono','inverno']
var seasonInfo = [
    ['De 23 de Setembro a 21 de Dezembro', 
                'A palavra primavera deriva do latim, primo vere, que significa primeiro verão. Verão significa tempo primaveril. Assim, primavera corresponde ao período que antecede o verão. A primavera é considerada por muitos a estação mais bonita do ano. Isso se deve ao fato de que nela ocorre a floração de diversas espécies de plantas. As paisagens enchem-se de cores, deixando ruas, campos, parques e jardins com o aspecto alegre e vívido. Essa estação do ano sucede o inverno e precede o verão. A primavera, assim como as demais estações do ano, não ocorre simultaneamente nos dois hemisférios. Em cada um deles, ela se inicia em uma data específica.',
                'https://brasilescola.uol.com.br/geografia/primavera.htm'],
    ['De 21 de Dezembro a 21 de março', 
            'A palavra verão originou-se do latim vulgar veranum tempus, que significa tempo primaveril. O verão, uma das quatro estações do ano, sucede a primavera e antecede o outono. Suas principais características são as elevadas temperaturas e o aumento dos índices pluviométricos.',
            'https://brasilescola.uol.com.br/geografia/verao.htm'],
    ['De 21 de março a 21 de Junho',
            'O outono é a estação do ano que começa após o verão e que antecede o inverno. Por conta disso, ela é considerada uma estação de transição. No Hemisfério Sul e, portanto, no Brasil, o outono tem início entre os dias 20 e 21 de março, enquanto no Hemisfério Norte ele se inicia entre os dias 22 e 23 de setembro. Algumas das principais características dessa estação são a redução gradual das temperaturas, bem como a diminuição do tempo de luz diária. O outono é conhecido também como a estação das frutas.',
            'https://brasilescola.uol.com.br/geografia/outono.htm'],
    ['De 21 de Junho a 23 de Setembro',
            'A palavra inverno deriva do latim, hibernum, que significa neutro, invernal, invernoso, tempo frio. O inverno é uma das quatros estações do ano e representa o período em que as temperaturas caem consideravelmente em regiões do planeta que apresentam essas estações bem definidas. Durante a vigência do inverno, muitas pessoas que vivem em países tropicais, e que, portanto, não vivenciam o inverno rigoroso, programam viagens para locais onde nevascas são comuns.',
            'https://brasilescola.uol.com.br/geografia/inverno.htm']
]


function changePage(operator){

    startPoint = 0;
    endPoint = 0;

    if(onTransition) return;

    let i = $.inArray(true, pages)

    pages[i] = false;

    if(i === (operator === 'next' ? pages.length - 1 : 0))
        pages[(operator === 'next' ? 0 : pages.length - 1)] = true;
    else
        pages[operator === 'next' ? i + 1 : i - 1] = true;

    $(pages).each( i => {
        if(pages[i]){
            $( pagesName[i] ).addClass( "active-page" ).removeClass("inative-page");
            $( pagesName[i] + " .cloud" ).removeClass( "translate" )
        }else{
            $( pagesName[i] ).addClass( "inative-page" ).removeClass( "active-page" );
            $( pagesName[i] + " .cloud" ).addClass( "translate" )
        }
    })
    onTransition = true;
    setTimeout(() => { onTransition = false; }, 1500);
}

//Scroll events
$('.page').bind('mousewheel DOMMouseScroll', function(event){
    
    if(!event.originalEvent.wheelDelta < -20 || event.originalEvent.wheelDelta > 20 )
        return;
        
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0)
        changePage('prev')
    else
        changePage('next')
});

//Touch events
$('.page').bind('touchstart touchmove', touchEvent );

let startPoint = 0;
let endPoint = 0;

function touchEvent(event){
    
    if(event.type === 'touchstart')
        startPoint = event.originalEvent.changedTouches[0].screenY
    else if(event.type === 'touchmove')
        endPoint = event.originalEvent.changedTouches[0].screenY

    let tmp = (startPoint > endPoint ? startPoint - endPoint : endPoint - startPoint) > 100 && startPoint != 0 && endPoint != 0;

    if(startPoint < endPoint && tmp)
        changePage('prev')
    else if(startPoint > endPoint && tmp)
        changePage('next')
}

$('.btn-close').click( ()=>{
    $('.info-box').css('transform', 'scale(0)')
    $('.btn-about').css('display', 'block')
})

$(".btn-about").click( () => {
    let i = $.inArray(true, pages)

    let text = seasonInfo[i];

    $('#title').html(text[0])
    $('#about').prepend(text[1])
    $('#credits').attr( 'href', text[2])
    
    $('.info-box').css('transform', 'scale(1.0)')
    
    $('.btn-about').css('display', 'none')
    $('.info').scrollTop(0);
})

