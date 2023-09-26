from rest_framework import serializers
from ..models import Agenda, CategoriasServicios,Roles, TipoDocumento, EstablecimientosServicios, Servicios, TiposServicios, Manzanas, Municipios, Personas, Usuarias, Citas


class RolesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Roles
        fileds = '__all__'

class UsuariasSerializer(serializers.ModelSerializer):
    rol = RolesSerializer(source = 'id_rol_fk', read_only = True)
    class Meta:
        model = Usuarias
        fileds = '__all__'


class TipoDocumentoSerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoDocumento
        fileds = '__all__'


class PersonasSerializer(serializers.ModelSerializer):
    tipo_documento = TipoDocumentoSerializer(source = 'id_servicio_fk' , read_only = True)
    usuaria = UsuariasSerializer(source = 'id_usuaria_fk' , read_only = True)
    class Meta:
        model = Personas
        fileds = '__all__'


class TiposServiciosSerializer(serializers.ModelSerializer):

    class Meta:
        model = TiposServicios
        fileds = '__all__'

class MunicipiosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Municipios
        fileds = '__all__'


class ManzanasSerializer(serializers.ModelSerializer):
    municipio = MunicipiosSerializer(source = 'id_municipio_fk' , read_only = True)
    class Meta:
        model = Manzanas
        fileds = '__all__'

class CategoriasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CategoriasServicios
        fileds = '__all__'

class ServiciosSerializer(serializers.ModelSerializer):
    categoria = CategoriasSerializer(source = 'id_servicio', read_only = True)
    tipo_servicio= TiposServiciosSerializer(source = 'id_categoria_fk', read_only = True)
    class Meta:
        model = Servicios
        fileds = '__all__'

class CitasSerializer(serializers.ModelSerializer):
    manzana= ManzanasSerializer(source = 'id_manzana_fk' , read_only = True)
    servicio= ServiciosSerializer(source = 'id_servicio_fk' , read_only = True)
    class Meta:
        model = Citas
        fileds = '__all__'

class AgendaSerializer(serializers.ModelSerializer):
    cita = CitasSerializer(source = 'id_cita_fk', read_only = True)
    persona = PersonasSerializer(source ='id_persona_fk', read_only = True)
    class Meta:
        model = Agenda
        fileds = '__all__'

class EstablecimientosSerializer(serializers.ModelSerializer):
    servicio= ServiciosSerializer(source = 'id_servicio_fk' , read_only = True)
    class Meta:
        model = EstablecimientosServicios    
        fileds = '__all__'









