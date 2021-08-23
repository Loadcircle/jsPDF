// Default export is a4 paper, portrait, using millimeters for units
window.jsPDF = window.jspdf.jsPDF;
const paddingLeft = 78.6;
const paddingTop = 56;
//font sizes
const f14 = 16, f16 = 20, f18 = 22, f24 = 30, f32 = 40;
const getWidthPercent = (value)=>{
    return value * width/100
}
const getHeightPercent = (value)=>{
    return value * height/100
}
const documentWidth = 1300 - (paddingLeft*2);
let positionTop = 0;
const getPositionTop = (increment = 0)=>{
    return positionTop += increment;
}
let positionRight = 0
const getPositionRight = (increment = 0, restart = false)=>{
    if(restart) positionRight = paddingLeft;
    return positionRight += increment;
}
const doc = new jsPDF({
    // orientation: 'p',
    unit: 'px',
    format: [1300, 1933],
    // format: 'a4',
    putOnlyUsedFonts:true,
    lineHeight: 1.6
});
const width = doc.internal.pageSize.getWidth();
const height = doc.internal.pageSize.getHeight();

function calculateIfNextPage(positionTop, elementHeight){    
    //element height + position top + footer height + margin
    if((elementHeight+positionTop+60+20) > height ){     
        return true;
    }
    return false;
}
function calculateIfNextLine(positionLeft, elementWidth){
    //element width + position left + width + padding
    if((elementWidth+positionLeft) >  documentWidth){     
        return true;
    }
    return false;
}

//DRAW MARGINS
function drawMargins(){
    doc.line(paddingLeft, paddingTop, width - paddingLeft, paddingTop) // horizontal line
    doc.line(paddingLeft, height-paddingTop, width - paddingLeft, height-paddingTop) // horizontal line
    doc.line(paddingLeft, paddingTop, paddingLeft, height-paddingTop) // vertical line
    doc.line(width - paddingLeft, paddingTop, width - paddingLeft, height-paddingTop) // vertical line
}
// drawMargins();

doc.setTextColor(64, 64, 64);
function drawLine(){
    getPositionTop(25)
    doc.setDrawColor(212, 219, 226);
    doc.line(paddingLeft, getPositionTop(0), width - (paddingLeft), getPositionTop()); 
    getPositionTop(25)
}

function printTitles(data){     
    doc.setFontSize(f24);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(64, 64, 64);
    doc.text(data.value, data.left, data.top)
}

function agentTitleComponent(){
    
    doc.addImage(`profile_example.jpg`, getPositionRight(paddingLeft), getPositionTop(paddingTop), 80, 80);
    doc.addImage(`fondo-foto.png`, paddingLeft-1, paddingTop-1, 82, 82);
    
    doc.setFontSize(f16);
    doc.setFont("helvetica", "bold");
    doc.text("Margarita Pereyra | Agente inmobiliario en RE/MAX", getPositionRight(95), getPositionTop(16));
    
    doc.setFont("helvetica", "normal");
    doc.text("margaritapereyra@gmail.com", getPositionRight(), getPositionTop(27));
    doc.text("996321966", getPositionRight(), getPositionTop(27));

    getPositionTop(5)
}
agentTitleComponent();

drawLine();

function propertyTitleComponent(){
    doc.setDrawColor(48, 225, 144);
    doc.setFillColor(48, 225, 144);
    doc.circle(paddingLeft+5, getPositionTop(), 5, 'FD');
    
    doc.setDrawColor(68, 112, 154);
    doc.setFillColor(68, 112, 154);
    doc.circle(getPositionRight(110, true), getPositionTop(), 5, 'FD');
    
    doc.setFontSize(f14);
    doc.setFont("helvetica", "bold");
    doc.text("EN VENTA", getPositionRight(15, true), getPositionTop(3.5))
    
    doc.text("EN ALQUILER", getPositionRight(105), getPositionTop())
     
    doc.text("PRECIO DE VENTA", getPositionRight(432), getPositionTop())
    
    doc.text("PRECIO DE RENTA/ALQUILER", getPositionRight(350), getPositionTop())
    
    doc.setFontSize(f32);
    doc.setFont("helvetica", "normal");
    doc.text("Departamento en Venta / Alquiler", getPositionRight(0, true), getPositionTop(35))
    
    doc.text("USD 38,698,800,000.00", getPositionRight(550), getPositionTop())
    doc.text("USD 1,200,000.00", getPositionRight(350), getPositionTop())
    
    doc.setFontSize(f18);
    doc.text("Avenida Cuba N° 639, Jesús María", getPositionRight(0, true), getPositionTop(28)); 
}
propertyTitleComponent();

drawLine();

doc.addImage("portada.png", paddingLeft, getPositionTop(), width-(paddingLeft*2), getWidthPercent(44));

getPositionTop(getWidthPercent(44));
drawLine();

function propertyGetMainChar(data, textWidth){

    doc.setFont("helvetica", "normal");
    doc.addImage(`./icon/${data.img}.png`, getPositionRight(textWidth), getPositionTop(-30), 30, 30);
    doc.text(data.title, getPositionRight(45), getPositionTop(5));
    doc.setFont("helvetica", "bold");
    doc.text(data.value, getPositionRight(), getPositionTop(25));
    textWidth = doc.getTextWidth(data.title)+60;
    
    return textWidth;
}

function PropertyCharacteristicsComponent(){
    const chars = [
        {
            title: 'Área Total',
            value: '140 m2',
            img: 'icon-area-total'
        },
        {
            title: 'Área Construida',
            value: '140 m2',
            img: 'icon-area-construccion'
        },
        {
            title: 'Antiguedad',
            value: '2',
            img: 'icon-antiguedad'
        },
        {
            title: 'Habitaciones',
            value: '2',
            img: 'icon-habiraciones'
        },
        {
            title: 'Baños',
            value: '1',
            img: 'icon-baños'
        },
        {
            title: 'Estacionamiento',
            value: '1',
            img: 'icon-estacionamientos'
        },
    ]
    getPositionTop(35);
    let textWidth = 0;
    chars.forEach(e=>{
        textWidth = propertyGetMainChar(e, textWidth);
    });
}
PropertyCharacteristicsComponent();

drawLine();

function propertyDescription(){
    printTitles({
        value: 'Descripción',
        left: getPositionRight(0, true),
        top: getPositionTop(12),
    });
    
    const description = `El departamento se encuentra ubicado en el primer piso de un edificio en miraflores, tiene vista interna es de un estilo americano ya ue la cocina y la sala esta en un solo ambiente, tablero de granito y los pisos son de parquet, tiene área de lavanderia con lavadora y secadora, el dormitorio principal tiene baño incorporado, el dormitorio secundario tiene baño completo.
    A dos cuadras de Av el ejercito, cerca de restaurantes. 
    Mantenimiento S/ 200 soles aproximadamente, no tiene cochera
    Condiciones 2*1
    En el precio va incluido el impuesto a la renta por alquiler y los arbitrios.El departamento se encuentra ubicado en el primer piso de un edificio en miraflores, tiene vista interna es de un estilo americano ya ue la cocina y la sala esta en un solo ambiente, tablero de granito y los pisos son de parquet, tiene área de lavanderia con lavadora y secadora, el dormitorio principal tiene baño incorporado, el dormitorio secundario tiene baño completo.
    A dos cuadras de Av el ejercito, cerca de restaurantes
    Mantenimiento S/ 200 soles aproximadamente
    no tiene cochera. 
    Condiciones 2*1.`;
    doc.setFontSize(f16);
    const splitDescription = doc.splitTextToSize(description, documentWidth);
    
    doc.text(splitDescription, getPositionRight(0, true), getPositionTop(25));

    const descriptionHeight = doc.getTextDimensions(splitDescription).h;
    getPositionTop(descriptionHeight-15);
}
propertyDescription();

drawLine();

function printMap(){    
    
    let mapPositionTop = getPositionTop(13);

    if(calculateIfNextPage(getPositionTop(), getWidthPercent(26.72))){
        footer();
        doc.addPage();
        mapPositionTop = paddingTop;        
    }
    
    printTitles({
        value: 'Avenida Cuba N° 639, Jesús María',
        left: getPositionRight(0, true),
        top: mapPositionTop,
    });

    doc.addImage("map_example.png", paddingLeft, mapPositionTop+20, width-(paddingLeft*2), getWidthPercent(26.72));
    
}
printMap();


function footer(){
    doc.setFillColor(64, 64, 64);
    doc.rect(0, height-60, width, 60, 'F');

    doc.setFontSize(f18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text('©2021 valiapro.com', getPositionRight(0, true), height-25);
    
    doc.text('Powered by Valia', 1110, height-25); 
}
footer();



//Page 2


doc.addPage();
positionTop = paddingTop;
drawMargins();


function getTag(data, left){

    doc.setFont("helvetica", "normal"); 
    doc.setFontSize(f16);   
    const textWidth = doc.getTextWidth(data);

    doc.setFillColor(224, 229, 234);
    //left, top, width, height, round round
    doc.roundedRect(getPositionRight(left), getPositionTop()-20, textWidth+30, 30, 15, 15, "F");


    doc.text(data, getPositionRight()+15, getPositionTop());

    return textWidth+40;
}

function generalChars(){ 
    printTitles({
        value: 'Características generales',
        left: getPositionRight(0, true),
        top: getPositionTop(18),
    });

    const tags = [
        'Cerca a Parques',
        'Cerca a Centros Comerciales ',
        'Cerca a Colegios',
        'Acabados de Lujo',
        'Cerca a Colegios',
        'Cerca a Centros Comerciales ',
        'Mascotas',
        'Intercomunicador',
        'Mascotas',
        'Cerca a Parques',
        'Cerca a Colegios',
        'Acabados de Lujo',
        'Cerca a Colegios',
        'Intercomunicador',
    ]
    let left = 0;
    getPositionTop(35);
    tags.forEach(e=>{

        if(calculateIfNextLine(getPositionRight(), left)){
            getPositionTop(40);
            getPositionRight(0, true);       
            left = 0;     
        }
        left = getTag(e, left);
    });

}

generalChars();
drawLine();


function servicesChars(){
    printTitles({
        value: 'Servicios',
        left: getPositionRight(0, true),
        top: getPositionTop(18),
    });

    const tags = [
        'Cerca a Centros Comerciales ',
        'Mascotas',
        'Intercomunicador',
        'Mascotas',
        'Cerca a Parques',
        'Cerca a Parques',
        'Acabados de Lujo',
        'Cerca a Centros Comerciales ',
        'Cerca a Colegios',
        'Acabados de Lujo',
        'Cerca a Colegios',
    ]
    let left = 0;
    getPositionTop(35);
    tags.forEach(e=>{
        if(calculateIfNextLine(getPositionRight(), left)){
            getPositionTop(40);
            getPositionRight(0, true);       
            left = 0;     
        }
        left = getTag(e, left);
    });

}
servicesChars();
drawLine();

function printPictures(){
    printTitles({
        value: 'Fotos adicionales',
        left: getPositionRight(0, true),
        top: getPositionTop(18),
    });

    const images = [
        {image: "image1.jpg", width: 750, height: 500},
        {image: "image2.jpg", width: 1726, height: 882},
        {image: "image3.png", width: 1204, height: 600},
        {image: "image4.jpg", width: 1024, height: 765},
        {image: "image5.jpg", width: 524, height: 532},
        {image: "image5.jpg", width: 524, height: 532},
    ];

    images.forEach(image=>{
        doc.addImage(`./casa/${image.image}`, getPositionRight(paddingLeft), getPositionTop(paddingTop), image.width, image.height);
    });


}
printPictures();





footer();





function getImageSizes(image){
    const size = {};
    const img = new Image();
    img.onload = function() {
        size.image = image;
        size.width = this.width;
        size.height = this.height;
    }
    img.src = './casa/'+image;

    return size; 
}


document.getElementById('preview').setAttribute("src", doc.output('bloburl'));
const donwloadPDF = ()=>{
    console.log('descargar')
    doc.save('example.pdf')
};

document.getElementById('descargarPDF').onclick = donwloadPDF;