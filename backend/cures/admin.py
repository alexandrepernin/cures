from django.contrib import admin
from .models import Tag, BodyPart, RecipeStep, Ingredient, Recipe, Symptom, Cure

class RecipeStepInline(admin.TabularInline):
      model=RecipeStep

class RecipeAdmin(admin.ModelAdmin):
      filter_horizontal = ("ingredients",)
      inlines=[RecipeStepInline,]


class CureInline(admin.TabularInline):
      model=Cure


class RecipeInline(admin.TabularInline):
      model=Recipe


class SymptomAdmin(admin.ModelAdmin):
      filter_horizontal = ("tags", "body_parts",)
      inlines = [CureInline,]

class CureAdmin(admin.ModelAdmin):
      list_filter = ('validated',)
      inlines=[RecipeInline,]

admin.site.register(Symptom, SymptomAdmin)
admin.site.register(Tag)
admin.site.register(BodyPart)
admin.site.register(Cure, CureAdmin)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(RecipeStep)
admin.site.register(Ingredient)
