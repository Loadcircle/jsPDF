// Default export is a4 paper, portrait, using millimeters for units
window.jsPDF = window.jspdf.jsPDF;
const paddingLeft = 78.6;
const paddingTop = 56;
const getWidthPercent = (value)=>{
    return value * width/100
}
const getHeightPercent = (value)=>{
    return value * height/100
}

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
    // format: [1300, 1933],
    // format: 'a4',
    // putOnlyUsedFonts:true,
    // floatPrecision: 16 // or "smart", default is 16
   }
);
const width = doc.internal.pageSize.getWidth();
const height = doc.internal.pageSize.getHeight();

//DRAW MARGINS
// doc.line(paddingLeft, paddingTop, width - paddingLeft, paddingTop) // horizontal line
// doc.line(paddingLeft, height-paddingTop, width - paddingLeft, height-paddingTop) // horizontal line
// doc.line(paddingLeft, paddingTop, paddingLeft, height-paddingTop) // vertical line
// doc.line(width - paddingLeft, paddingTop, width - paddingLeft, height-paddingTop) // vertical line

doc.setTextColor(64, 64, 64);

const profileImgRadio = 40;
doc.circle(paddingLeft+profileImgRadio, getPositionTop(paddingTop+profileImgRadio), profileImgRadio, 'FD');

doc.setFontSize(16);
doc.setFont("helvetica", "bold");
doc.text("Margarita Pereyra | Agente inmobiliario en RE/MAX", getPositionRight(paddingLeft+(profileImgRadio * 2)+15), getPositionTop(-25));

doc.setFont("helvetica", "normal");
doc.text("margaritapereyra@gmail.com", getPositionRight(), getPositionTop(27));
doc.text("996321966", getPositionRight(), getPositionTop(27));

doc.setDrawColor(212, 219, 226);
doc.line(paddingLeft, getPositionTop(25), width - (paddingLeft), getPositionTop()); 


doc.setDrawColor(48, 225, 144);
doc.setFillColor(48, 225, 144);
doc.circle(paddingLeft+5, getPositionTop(25), 5, 'FD');

doc.setDrawColor(68, 112, 154);
doc.setFillColor(68, 112, 154);
doc.circle(getPositionRight(90, true), getPositionTop(), 5, 'FD');

doc.setFontSize(14);
doc.setFont("helvetica", "bold");
doc.text("EN VENTA", getPositionRight(15, true), getPositionTop(2.5))

doc.text("EN ALQUILER", getPositionRight(85), getPositionTop())
 
doc.text("PRECIO DE VENTA", getPositionRight(600), getPositionTop())

doc.text("PRECIO DE RENTA/ALQUILER", getPositionRight(270), getPositionTop())

doc.setFontSize(32);
doc.setFont("helvetica", "normal");
doc.text("Departamento en Venta / Alquiler", getPositionRight(0, true), getPositionTop(35))

doc.text("USD 259,573", getPositionRight(698), getPositionTop())
doc.text("USD 1,200", getPositionRight(270), getPositionTop())

doc.setFontSize(18);
doc.text("Avenida Cuba N° 639, Jesús María", getPositionRight(0, true), getPositionTop(28))

doc.setDrawColor(212, 219, 226);
doc.line(paddingLeft, getPositionTop(20), width - (paddingLeft), getPositionTop()); 


doc.addImage("portada.png", paddingLeft, getPositionTop(20), width-(paddingLeft*2), getWidthPercent(44));





















document.getElementById('preview').setAttribute("src", doc.output('bloburl'));
const donwloadPDF = ()=>{
    console.log('descargar')
    doc.save('example.pdf')
};

document.getElementById('descargarPDF').onclick = donwloadPDF;