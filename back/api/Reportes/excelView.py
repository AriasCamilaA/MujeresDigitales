from django.apps import apps
from django.http import HttpResponse
import pandas as pd
from io import BytesIO

def reportExcel(request, nombre_modelo):
    # Buscar el modelo del cual se va a generar y/o descargar el reporte
    app_label = 'api'
    modelos = apps.get_app_config(app_label).get_models()
    
    for modelo in modelos:
        if nombre_modelo == modelo.__name__:
            # Traer los datos del modelo
            datos = modelo.objects.all()

            # Crear un DataFrame de pandas a partir de los datos
            df = pd.DataFrame(list(datos.values()))

            # Crear un objeto BytesIO para guardar el archivo Excel
            output = BytesIO()

            # Utilizar pandas para guardar el DataFrame en formato Excel
            nombre_reporte = f'{nombre_modelo}_reporte.xlsx'
            df.to_excel(output, index=False, sheet_name='Hoja1')
            
            # Configurar la respuesta para descargar el archivo Excel
            response = HttpResponse(output.getvalue(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'inline; filename="{nombre_reporte}"'

            return response