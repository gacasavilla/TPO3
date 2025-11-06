$(document).ready(function() {
  console.log('JS cargado'); // Depuración: verifica que el JS se ejecute

  // Promoción 1: Llevá 2 productos y obtené 50% en el segundo
  $('.promo').first().find('button').click(function() {
    console.log('Botón promo 1 clickeado'); 
    const precio = parseFloat($(this).closest('.promo').find('input[type="number"]').first().val()); // Precio del producto
    const cantidad = parseInt($(this).closest('.promo').find('input[type="number"]').last().val()); // Cantidad

    console.log('Precio:', precio, 'Cantidad:', cantidad); 

    if (!precio || precio <= 0 || cantidad !== 2) {
      $(this).closest('.promo').find('.resultado').html('<p style="color: red;">Ingresa un precio válido y cantidad de 2 productos.</p>');
      return;
    }

    const totalSinDescuento = precio * cantidad; 
    const descuentoAplicado = precio * 0.5; // 50% off en el segundo
    const totalFinal = totalSinDescuento - descuentoAplicado;
    const ahorro = descuentoAplicado;

    $(this).closest('.promo').find('.resultado').html(`
      <p><strong>Total sin descuento:</strong> $${totalSinDescuento.toFixed(2)}</p>
      <p><strong>Descuento aplicado:</strong> $${descuentoAplicado.toFixed(2)} (50% en el segundo producto)</p>
      <p><strong>Total final con ahorro:</strong> $${totalFinal.toFixed(2)}</p>
      <p><strong>¡Ahorraste:</strong> $${ahorro.toFixed(2)}!</p>
    `);
  });

  // Promoción 2: 3x2 en productos seleccionados
  $('.promo').eq(1).find('button').click(function() {
    console.log('Botón promo 2 clickeado'); 
    const precio = parseFloat($(this).closest('.promo').find('input[type="number"]').first().val()); 
    const cantidad = parseInt($(this).closest('.promo').find('input[type="number"]').last().val());

    console.log('Precio:', precio, 'Cantidad:', cantidad); 

    if (!precio || precio <= 0 || cantidad !== 3) {
      $(this).closest('.promo').find('.resultado').html('<p style="color: red;">Ingresa un precio válido y cantidad de 3 productos.</p>');
      return;
    }

    const totalSinDescuento = precio * cantidad; 
    const descuentoAplicado = precio; // El más barato gratis (1 producto)
    const totalFinal = totalSinDescuento - descuentoAplicado;
    const ahorro = descuentoAplicado;

    $(this).closest('.promo').find('.resultado').html(`
      <p><strong>Total sin descuento:</strong> $${totalSinDescuento.toFixed(2)}</p>
      <p><strong>Descuento aplicado:</strong> $${descuentoAplicado.toFixed(2)} (el producto más barato gratis)</p>
      <p><strong>Total final con ahorro:</strong> $${totalFinal.toFixed(2)}</p>
      <p><strong>¡Ahorraste:</strong> $${ahorro.toFixed(2)}!</p>
    `);
  });

  // Promoción 3: 10% de descuento por compras superiores a $30.000
  $('.promo').last().find('button').click(function() {
    console.log('Botón promo 3 clickeado'); 
    const totalCompra = parseFloat($(this).closest('.promo').find('input[type="number"]').val()); // Total de la compra

    console.log('Total compra:', totalCompra); 

    if (!totalCompra || totalCompra <= 0) {
      $(this).closest('.promo').find('.resultado').html('<p style="color: red;">Ingresa un total de compra válido.</p>');
      return;
    }

    const totalSinDescuento = totalCompra;
    let descuentoAplicado = 0;
    if (totalCompra > 30000) {
      descuentoAplicado = totalCompra * 0.10; // 10% off
    }
    const totalFinal = totalSinDescuento - descuentoAplicado;
    const ahorro = descuentoAplicado;

    $(this).closest('.promo').find('.resultado').html(`
      <p><strong>Total sin descuento:</strong> $${totalSinDescuento.toFixed(2)}</p>
      <p><strong>Descuento aplicado:</strong> $${descuentoAplicado.toFixed(2)} ${descuentoAplicado > 0 ? '(10% por superar $30.000)' : '(no aplica)'}</p>
      <p><strong>Total final con ahorro:</strong> $${totalFinal.toFixed(2)}</p>
      <p><strong>¡Ahorraste:</strong> $${ahorro.toFixed(2)}!</p>
    `);
  });
});
