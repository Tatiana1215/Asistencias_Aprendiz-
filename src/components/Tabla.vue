<template>
  <div class="table-container">
    <table>
      <tr>
        <th colspan="11" class="title-row">REGISTRO DE ASISTENCIA Y APROBACIÓN DEL ACTA No-</th>
      </tr>
      <tr>
        <th colspan="11" class="subtitle-row">DEL DÍA _____ DEL MES DE _____ DEL AÑO 2024</th>
      </tr>
      <tr>
        <th colspan="11" class="objective-row">OBJETIVO (S)</th>
      </tr>
      <tr>
        <th>No.</th>
        <th>NOMBRES Y APELLIDOS</th>
        <th>No. DOCUMENTO</th>
        <th>PLANTA</th>
        <th>CONTRATISTA</th>
        <th>OTRO ¿CUAL?</th>
        <th>DEPENDENCIA/EMPRESA</th>
        <th>CORREO ELECTRÓNICO</th>
        <th>TELÉFONO/EXT. SENA</th>
        <th>AUTORIZA GRABACIÓN</th>
        <th>FIRMA O PARTICIPACIÓN VIRTUAL</th>
      </tr>
      <!-- Filas de datos dinámicas -->
      <tr v-for="(fila, index) in completarFilas" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ fila.nombres || '' }}</td>
        <td>{{ fila.documento || '' }}</td>
        <td>{{ fila.planta || '' }}</td>
        <td>{{ fila.contratista || '' }}</td>
        <td>{{ fila.otro || '' }}</td>
        <td>{{ fila.dependencia || '' }}</td>
        <td>{{ fila.correo || '' }}</td>
        <td>{{ fila.telefono || '' }}</td>
        <td>{{ fila.autoriza || ''}} </td>
        <td>{{ fila.firma || '' }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filas: [] // Se llenará con la información de otra tabla
    };
  },
  computed: {
    completarFilas() {
      // Si hay menos de 27 filas, agrega filas vacías para completar
      const filasCompletas = [...this.filas];
      while (filasCompletas.length < 27) {
        filasCompletas.push({
          nombres: "",
          documento: "",
          planta: "",
          contratista: "",
          otro: "APRENDIZ",
          dependencia: "",
          correo: "",
          telefono: "",
          autoriza: "",
          firma: ""
        });
      }
      return filasCompletas;
    }
  },
  mounted() {
    this.obtenerDatos();
  },
  methods: {
    obtenerDatos() {
      // Aquí deberías llamar a tu API o fuente de datos para obtener la información
      // axios.get('/api/otraTabla').then(response => {
      //   this.filas = response.data;
      // });


    
    }
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  margin: 0 auto;
  display: grid;
  place-items: center;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  font-size: 15px;
}

th {
  background-color: #f2f2f2;
}

.title-row {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.subtitle-row {
  font-size: 14px;
  text-align: center;
}

.objective-row {
  font-size: 14px;
  text-align: left;
}
</style>
