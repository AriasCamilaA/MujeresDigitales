from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .Controllers.tipo_documento import tipo_documentoCRUD
from .Controllers.Users import UsersCRUD
from .Controllers.Users import login_view
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
from .Reportes.excelView import reportExcel

router = DefaultRouter()
router.register(r'tipo_documento',tipo_documentoCRUD )
router.register(r'Users',UsersCRUD )
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
#path('token/',jwt_views.TokenObtainPairView.as_view(), name="obtener_token"),
#path('token/refresh/',jwt_views.TokenRefershView.as_view(), name='refrescar_token'),
path('reporte/<str:nombre_modelo>/', reportExcel, name="reporte"),
path('login/',login_view,name="login")
]