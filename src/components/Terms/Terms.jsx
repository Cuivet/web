import { Collapse } from "antd";
import React from "react";

export default function Terms() {
  // ponerle estilo
  return (
    <Collapse ghost accordion>
      <Collapse.Panel header="INFORMACIÓN RELEVANTE" key={"1"}>
        <p>
          Usuarios: Los usuarios de la plataforma se clasifican en tres
          categorías: <br></br>
          <ul>
            <li>
              Veterinarios: Profesionales de la salud animal registrados y
              autorizados para acceder a la plataforma.{" "}
            </li>
            <li>
              Tutores de mascotas: Personas naturales que son tutores o
              responsables de una mascota y que utilizan la plataforma para
              acceder a la información clínica de la misma.
            </li>
            <li>
              Propietarios de locales veterinarios: Personas físicas o jurídicas
              que son propietarias o responsables de un establecimiento
              veterinario y utilizan la plataforma para gestionar la información
              clínica de sus pacientes, así como para administrar su negocio.
            </li>
          </ul>
        </p>
      </Collapse.Panel>
      <Collapse.Panel header="USO NO AUTORIZADO" key={"4"}>
        <p>
          Propietarios de locales veterinarios: Además de las prohibiciones
          generales, se prohíbe a los propietarios de locales veterinarios
          utilizar la plataforma para:
          <ul>
            <li>
              Publicar información falsa o engañosa sobre su establecimiento.
            </li>
            <li>
              Utilizar la plataforma para realizar prácticas comerciales
              desleales.
            </li>
            <li>
              Violar cualquier normativa vigente en materia de protección de
              datos y secreto profesional.
            </li>
          </ul>
        </p>
      </Collapse.Panel>
      <Collapse.Panel header="CONFORMACIÓN ANTIFRAUDE" key={"2"}>
        <p>
          Propietarios de locales veterinarios: Se requerirá la verificación de
          la identidad del propietario del local veterinario, así como de la
          legalidad del establecimiento.
        </p>
      </Collapse.Panel>
      <Collapse.Panel header="RESPONSABILIDADES DE LA PLATAFORMA" key={"3"}>
        <ul>
          <li>
            Mantenimiento: La plataforma se compromete a mantener la plataforma
            operativa y segura, realizando las actualizaciones necesarias.
          </li>
          <li>
            Confidencialidad: La plataforma se compromete a mantener la
            confidencialidad de la información de los usuarios, implementando
            medidas de seguridad adecuadas.
          </li>
          <li>
            {" "}
            Disponibilidad: Se establecerá un tiempo estimado de disponibilidad
            de la plataforma, así como los procedimientos a seguir en caso de
            interrupciones del servicio.
          </li>
        </ul>
      </Collapse.Panel>
      <Collapse.Panel header="PROPIEDAD INTELECTUAL" key={"5"}>
        <p>
          Contenido generado por el usuario: Se definirá qué derechos adquiere
          la plataforma sobre el contenido generado por los usuarios (por
          ejemplo, reseñas, comentarios). Marcas comerciales: Se especificarán
          las marcas comerciales de la plataforma y se prohibirá su uso no
          autorizado.
        </p>
      </Collapse.Panel>
    </Collapse>
  );
}
