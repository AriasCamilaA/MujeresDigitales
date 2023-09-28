from rest_framework import serializers
from ..models import Agenda, CategoriasServicios,Roles, TipoDocumento, EstablecimientosServicios, Servicios, TiposServicios, Manzanas, Municipios, Personas, Usuarias, Citas

#clase serializer para cada modelo con los campos correspondientes
class RolesSerializer(serializers.ModelSerializer):

    class Meta: # esta clase le indica al serializador lo que debe hacer
        model = Roles
        fields = '__all__'

class UsuariasSerializer(serializers.ModelSerializer):
    rol = RolesSerializer(source = 'id_rol_fk', read_only = True)
    class Meta:
        model = Usuarias
        fields = '__all__'


class TipoDocumentoSerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoDocumento
        fields = '__all__'


class PersonasSerializer(serializers.ModelSerializer):
    tipo_documento = TipoDocumentoSerializer(source='id_tipo_documento_fk', read_only=True)
    usuaria = UsuariasSerializer(source='id_usuaria', read_only=True)
    class Meta:
        model = Personas
        fields = '__all__'

class TiposServiciosSerializer(serializers.ModelSerializer):

    class Meta:
        model = TiposServicios
        fields = '__all__'

class MunicipiosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Municipios
        fields = '__all__'


class ManzanasSerializer(serializers.ModelSerializer):
    municipio = MunicipiosSerializer(source = 'id_municipio_fk' , read_only = True)
    class Meta:
        model = Manzanas
        fields = '__all__'

class CategoriasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CategoriasServicios
        fields = '__all__'

class ServiciosSerializer(serializers.ModelSerializer):
    categoria = CategoriasSerializer(source = 'id_categoria_fk', read_only = True)
    tipo_servicio= TiposServiciosSerializer(source = 'id_tipo_servicio_fk', read_only = True)
    class Meta:
        model = Servicios
        fields = '__all__'

class CitasSerializer(serializers.ModelSerializer):
    manzana= ManzanasSerializer(source = 'id_manzana_fk' , read_only = True)
    servicio= ServiciosSerializer(source = 'id_servicio_fk' , read_only = True)
    class Meta:
        model = Citas
        fields = '__all__'

class AgendaSerializer(serializers.ModelSerializer):
    cita = CitasSerializer(source = 'id_cita_fk', read_only = True)
    persona = PersonasSerializer(source ='id_persona_fk', read_only = True)
    class Meta:
        model = Agenda
        fields = '__all__'

class EstablecimientosSerializer(serializers.ModelSerializer):
    servicio= ServiciosSerializer(source = 'id_servicio_fk' , read_only = True)
    class Meta:
        model = EstablecimientosServicios    
        fields = '__all__'









