import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
@charset "UTF-8";
:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 50px;
  padding-right: 50px;
}

.pokemon-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}

.pokemon-item {
  border: 5px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 50px;
  height: 50px; /* Ajusta la altura para dar espacio a la imagen y el texto */
  display: flex;
  flex-direction: column; /* Asegura que el contenido esté en columna */
  justify-content: center;
  align-items: center;
}

.img {
  max-width: 60%;
  height: auto;
  margin-bottom: 10px; /* Espacio entre la imagen y el texto */
}

.evolutions {
  display: flex; /* Coloca las evoluciones en una fila */
  flex-wrap: wrap; /* Permite que las evoluciones se envuelvan en varias filas */
  gap: 20px; /* Espaciado entre las cartas */
}

.evolution-item {
  border: 1px solid #ccc; /* Borde gris claro */
  border-radius: 10px; /* Esquinas redondeadas */
  padding: 10px; /* Espaciado interno */
  text-align: center; /* Centra el texto */
  width: 150px; /* Ancho fijo para cada carta */
  height: 200px; /* Altura fija para cada carta */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Sombra para un efecto de elevación */
  transition: transform 0.3s; /* Animación suave para hover */
}

.evolution-item:hover {
  transform: scale(1.05); /* Aumenta ligeramente el tamaño al pasar el ratón */
}

.evo-image {
  width: 80px; /* Tamaño de imagen ajustado */
  height: auto; /* Mantiene la relación de aspecto */
  margin-bottom: 10px; /* Espaciado debajo de la imagen */
}

.card {
  background-color: #fff; /* Fondo blanco para las tarjetas */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar un efecto de elevación */
  overflow: hidden; /* Recorta el contenido si se sale del borde */
  width: 250px; /* Ancho fijo para la tarjeta */
  text-align: center; /* Centra el contenido en la tarjeta */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animación suave */
  padding: 15px;
  margin: 20px;
}

.card.expanded {
  transform: scale(1.1); /* Escala la tarjeta al 110% */
  z-index: 1; /* Asegura que la tarjeta ampliada esté por encima de otras */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}

.modal-content {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Para el posicionamiento del botón de cerrar */
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.modal-content button {
  margin: 10px;
}
`;
