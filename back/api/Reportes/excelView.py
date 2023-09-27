#from django.apps import apps
#from django.http import HttpResponse
#from openpyxl import Workbook
#
#def reportExcel(request, modelo):
#    # Verificar que 'modelo' sea el nombre del modelo en forma de cadena
#    if not isinstance(modelo, str):
#        return HttpResponse('Debe ingresar el nombre del modelo como una cadena de texto')
#
#    # Obtener el modelo correspondiente
#    buscar_modelo = apps.get_model(app_label='api', model_name=modelo)
#
#    # Verificar si el modelo existe
#    if buscar_modelo is None:
#        return HttpResponse('El modelo especificado no existe')
#
#    # Crear un libro nuevo
#    libro = Workbook()
#    # Indicar que se trabajará en la hoja que esté activa
#    hoja = libro.active
#
#    # Traer los campos del modelo, registrando los campos en el arreglo mediante un for concatenado y sentencia if
#    campos = [field for field in buscar_modelo._meta.get_fields() if field.concrete]
#    encabezados = [field.name for field in campos]
#    for numero_columna, encabezado in enumerate(encabezados, 1):
#        hoja.cell(row=1, column=numero_columna, value=encabezado)
#
#    # Traer los datos del modelo
#    datos = buscar_modelo.objects.all()
#
#    # Leer los datos mediante un bucle que recorre los campos y los datos de los campos y los agrega a la hoja excel 
#    start_fila = 2  # Comenzamos en la segunda fila para los datos
#    for item in datos:
#        for numero_columna, campo in enumerate(campos, 1):
#            dato = getattr(item, campo.name)
#            hoja.cell(row=start_fila, column=numero_columna, value=dato)
#        start_fila += 1
#
#    # Agregar nombre predeterminado para el reporte
#    nombre_reporte = f'{modelo}_reporte.xlsx'
#
#    # Configurar la respuesta para descargar el archivo Excel
#    respuesta = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
#    respuesta['Content-Disposition'] = f'attachment; filename="{nombre_reporte}"'
#
#    # Guardar el libro
#    libro.save(respuesta.content)
#
#    return respuesta
