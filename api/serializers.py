from rest_framework import serializers

from bio_data.models import FarmerBioData
from farm_field.models import Farm, FarmField


class FarmerBioDataSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="api:farmerbiodata-detail")

    class Meta:
        model = FarmerBioData
        fields = ('url', 'id', 'name', 'contact_no', 'address', 'pin')


class FarmSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:farm-detail")
    farmer = FarmerBioDataSerializer(read_only=True)
    farmer_id = serializers.PrimaryKeyRelatedField(
        queryset=FarmerBioData.objects.all(), write_only=True)

    class Meta:
        model = Farm
        fields = ('url', 'id', 'farmer', 'farmer_id', 'name', 'details', )

    def create(self, validated_data):
        farmer = validated_data.pop('farmer_id')
        farm = Farm.objects.create(farmer=farmer, **validated_data)
        return farm


class FarmFieldSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:farmfield-detail")
    farm = FarmSerializer(read_only=True)
    farm_id = serializers.PrimaryKeyRelatedField(
        queryset=Farm.objects.all(), write_only=True)

    field_from = serializers.DateField(input_formats=(u"%Y-%m-%d",))
    field_to = serializers.DateField(input_formats=(u"%Y-%m-%d",))

    class Meta:
        model = FarmField
        fields = (
            'url', 'id', 'farm', 'farm_id', 'name', 'season', 'crop_type',
            'field_from', 'field_to', 'land_coordinates'
            )

    def create(self, validated_data):
        farm = validated_data.pop('farm_id')
        farm_field = FarmField.objects.create(farm=farm, **validated_data)
        return farm_field
