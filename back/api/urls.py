from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .Controllers.tipo_documento import tipo_documentoCRUD
from .Controllers.usuarias import usuariasCRUD
from .Controllers.personas import personasCRUD
from .Controllers.manzanas import manzanasCRUD
from .Controllers.Roles import rolesCRUD
from .Controllers.servicios import serviciosCRUD
from .Controllers.categorias_servicios import categorias_serviciosCRUD
from .Controllers.tipos_servicios import tipos_serviciosCRUD
from .Controllers.municipios import municipiosCRUD
from .Controllers.citas import citasCRUD
from .Controllers.establecimientos_servicios import establecimientosCRUD
from .Controllers.agenda import agendaCRUD
#from .Controllers.Auth.login import login
#from .Reportes.excelView import reportExcel


router = DefaultRouter()
router.register(r'tipo_documento',tipo_documentoCRUD )
router.register(r'usuarias',usuariasCRUD )
router.register(r'personas',personasCRUD )
router.register(r'manzanas',manzanasCRUD )
router.register(r'Roles',rolesCRUD )
router.register(r'servicios',serviciosCRUD )
router.register(r'categorias_servicios',categorias_serviciosCRUD )
router.register(r'tipos_servicios',tipos_serviciosCRUD )
router.register(r'municipios',municipiosCRUD )
router.register(r'citas',citasCRUD )
router.register(r'establecimientos_servicios',establecimientosCRUD )
router.register(r'agenda',agendaCRUD )
urlpatterns=[
path('',include(router.urls)),
#path('login/',login, name="login"),
#path('reporte/<str:modelo>/', reportExcel, name="reporte")
]
