"use strict";

const productos = [
  {
    id: 1,
    name: "Adidas asistir W",
    brandId: 2,
    price: "20000",
    discount: 0,
    description:
      "Detalles distintivos, proporciones más exageradas, las Zapatillas adidas Asistir W aseguran un andar con estilo. Cuentan con una mediasuela con amortiguación dinámica y de estilo robusto. Además, una característica importante es que el 25% de los componentes utilizados para fabricar este calzado está hecho con, al menos, un 50% de contenido reciclado. ¡Subite, asegurá tu tendencia, y sumate al mundo",
    dues: 6,
    categoryId: 2,
    image: "zapa 1.jpg",
  },
  {
    id: 2,
    name: "Adidas Multix",
    brandId: 2,
    price: "16999",
    discount: 0,
    description:
      "Para tus días de relax y para acompañar tus looks informales con todo el estilo. Las Zapatillas adidas Multix se inspiran en los clásicos estilos deportivos de adidas y se readaptan a tu rutina diaria. Las tres rayas a los costados te dan el toque de originalidad que buscabas y el diseño liviano te permite combinarlas con todas las prendas de tu ropero.",
    dues: 3,
    categoryId: 2,
    image: "zapa 2.jpg",
  },
  {
    id: 3,
    name: "Adidas Zx 1K Boost",
    brandId: 2,
    price: "18500",
    dues: 6,
    discount: 0,
    description:
      "Las zapatillas Adidas ZX 1K Boost están confeccionadas en su exterior con gamuza sintética y de forro interno textil para una sensación más cómoda y estable. La combinación entre Boost y EVA en la mediasuela son el gran acierto de estas zapatillas para que te sientas en el aire mientras caminas todo el día. Su diseño con las clásicas tiras laterales y mix de tonos la vuelven más deportiva para tus looks urbanos.",
    categoryId: 2,
    image: "zapa 3.jpg",
  },
  {
    id: 4,
    name: "Puma Mayze Women",
    brandId: 1,
    price: "19999",
    dues: 6,
    discount: 15,
    description:
      "Si buscas unas zapatillas para usar a toda hora y en todo lugar, las Zapatillas Converse Chuck Taylor Core Ox son para vos. Te dan la versatilidad que quieres para combinarlas con lo mejor que tengas en el ropero sin perder el estilo y la comodidad.",
    categoryId: 1,
    image: "zapa 4.jpg",
  },
  {
    id: 5,
    name: "Vans Sk8-Hi",
    brandId: 6,
    price: "28699",
    dues: 6,
    discount: 50,
    description:
      "Reviví un clásico de la marca con las Zapatillas Vans Sk8-Hi, diseñadas con una lona resistente y con una suela tipo waffle que garantiza una durabilidad única. Su caña media asegura el calce y renueva el clásico modelo de las Vans para mejorar tu estabilidad.",
    categoryId: 1,
    image: "zapa 10.jpg",
  },
  {
    id: 6,
    name: "Puma Cali Star Wn S",
    brandId: 1,
    price: "22499",
    dues: 6,
    discount: 0,
    description:
      "Las Zapatillas Puma Cali Star Wn S son urbanas, cómodas y super versátiles para completar todos tus outfits. Con una parte superior de cuero con empeine perforado, cuentan con cierre de cordones, entresuela de goma apilada con herramientas texturizadas y plantilla moldeada de PU para mayor confort. Incluye pieza de TPU de acabado brillante con la marca PUMA en las herramientas del talón y logotipo de la marca en el lateral.",
    categoryId: 1,
    image: "zapa 11.jpg",
  },
  {
    id: 7,
    name: "Vans Ultra Range Rapidweld",
    brandId: 6,
    price: "38999",
    dues: 6,
    discount: 50,
    description:
      "No podemos negar que la calidad de Vans brinda calzados para toda la vida, por eso las Zapatillas Vans Ultra Range Rapidweld son la mejor opción a la hora de elegir un par que te acompañe siempre. Su diseño mezcla lo urbano y lo deportivo para darles mayor versatilidad; tienen un interior sin costuras que reduce el peso y la fricción y una suela waffle invertida que aporta una mejor tracción para que todos tus pasos sean con la comodidad que mereces.",
    categoryId: 1,
    image: "zapa 6.jpg",
  },
  {
    id: 8,
    name: "Vans Safari Multi Era",
    brandId: 6,
    price: "18299",
    dues: 6,
    discount: 0,
    description:
      "Inspiradas en los animales salvajes de las Llanuras de África, las Zapatillas Vans Safari Multi Era tienen un estilo audaz que rompe con tus zapatillas de uso diario. Elevá tu nivel con este calzado hecho con lona y una suela de goma que mejora la tracción, para que puedas disfrutar de tu vida con unas zapatillas diseñadas para resistirlo todo.",
    categoryId: 1,
    image: "zapa 8.jpg",
  },
  {
    id: 9,
    name: "Air Jordan 1 Jester XX Low",
    brandId: 3,
    price: "17999",
    dues: 6,
    discount: 0,
    description:
      "Las zapatillas Nike Air Jordan 1 Jester XX Low se destacan por un diseño que fusiona por un lado su exterior que combina la piel natural y sintética proporcionando una mejor sujeción donde más se necesita y, por otro lado, su media suela gruesa cuenta con la tecnología Air que te proporciona más altura con una forma disruptiva en su mitad con forma de olas para que sientas confort y estilo en cada paso.",
    categoryId: 1,
    image: "zapa jordan.jpg",
  },
  {
    id: 10,
    name: "Reebok Classic Leather",
    brandId: 5,
    price: "16499",
    dues: 6,
    discount: 0,
    description:
      "Las Zapatillas Reebok Classic Leather, tienen un estilo retro y clásico ideal para que puedas combinar con cualquier prenda. Además, ofrecen excelente amortiguación y durabilidad.",
    categoryId: 1,
    image: "zapa 9.jpg",
  },
  {
    id: 11,
    name: "Adidas Loli",
    brandId: 2,
    price: "14499",
    dues: 6,
    discount: 0,
    description:
      "Las zapatillas Topper Loli (ahora Adidas) son ese calzado listo para dar un paseo. Con una parte superior de sintético súper suave y una plataforma y una plataforma que transforma la clásica zapatilla Topper en un nuevo ícono de la moda, ellas se convierten en una elección perfecta para esas mujeres simples pero modernas. Tenelas siempre a mano para completar tu look deportivo o casual.",
    categoryId: 1,
    image: "zapa 5.jpg",
  },
  {
    id: 12,
    name: "Puma Muse X3 Metallic",
    brandId: 1,
    price: "22049",
    dues: 6,
    discount: 0,
    description:
      "El estilo de las Zapatillas Muse X3 Metallic se inspira en el deporte, pero lo adapta al uso urbano. Cuenta con una silueta elegante, un empeine brillante y una inserción metálica audaz en el talón. Además, presenta una confección única, que facilita su calce con correas elasticas cruzadas que se unen para crear unos tenis únicos. El estilo de este par de zapatos se define como audaz y atrevido.",
    categoryId: 1,
    image: "zapa 7.jpg",
  },
];

const products = productos.map(({name,brandId,price,dues,discount,description,categoryId}) => {
  return {
   name,
   price,
   dues,
   brandId,
   discount,
   description,
   categoryId,
    createdAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
