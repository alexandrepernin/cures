from django.contrib import admin
from .models import Tag, BodyPart, RecipeStep, Ingredient, Recipe, Symptom, Cure



class RecipeAdmin(admin.ModelAdmin):
      filter_horizontal = ("ingredients","steps")

class SymptomAdmin(admin.ModelAdmin):
      filter_horizontal = ("cures","tags", "body_parts",)

class CureAdmin(admin.ModelAdmin):
    list_filter = ('validated',)


admin.site.register(Symptom, SymptomAdmin)
admin.site.register(Tag)
admin.site.register(BodyPart)
admin.site.register(Cure, CureAdmin)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(RecipeStep)
admin.site.register(Ingredient)
