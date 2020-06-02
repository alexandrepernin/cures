from django.db import models

class Tag(models.Model):
    name = models.CharField(default="Tag Name", max_length=64)

    def __str__(self):
        return f"Tag #{self.id}: {self.name}"

class BodyPart(models.Model):
    name = models.CharField(default="Name", max_length=64)
    precision = models.IntegerField(default=0, choices=[(0, 'General'), (1,'Precise')])

    def __str__(self):
        return f"Body Part ({self.precision}) #{self.id}: {self.name}"

class Ingredient(models.Model):
    name = models.CharField(default="ingredient", max_length=64)
    quantity = models.IntegerField(default=0)
    unit = models.CharField(default="ml", max_length=64)

    def __str__(self):
        return f"{self.name}: {self.quantity} {self.unit}"

class RecipeStep(models.Model):
    description = models.TextField(default="description")
    step_number = models.IntegerField(default=1)

    def __str__(self):
        text = self.description[:25]
        return f"Step {self.step_number}: {text}.."

class Recipe(models.Model):
    name = models.CharField(default="Recipe Name", max_length=64)
    ingredients = models.ManyToManyField(Ingredient, blank=True, related_name="recipes")
    cook_time = models.IntegerField(default=45)
    steps = models.ManyToManyField(RecipeStep, blank=True, related_name="recipes")

    def __str__(self):
        return self.name

class Cure(models.Model):
    name = models.CharField(default="name", max_length=64)
    validated = models.BooleanField(default=False)
    recipe = models.ForeignKey(Recipe, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Symptom(models.Model):
    name = models.CharField(default="name", max_length=64)
    cures = models.ManyToManyField(Cure, blank=True, related_name="symptoms")
    body_parts = models.ManyToManyField(BodyPart, blank=True, related_name="symptoms")
    tags = models.ManyToManyField(Tag, blank=True, related_name="symptoms")

    def __str__(self):
        return self.name
