from django.db import models

class Tag(models.Model):
    name = models.CharField(default="Tag Name", max_length=64)

    def __str__(self):
        return f"#{self.name}"

class BodyPart(models.Model):
    name = models.CharField(default="Name", max_length=64)
    precision = models.IntegerField(default=0, choices=[(0, 'General'), (1,'Precise')])

    def __str__(self):
        if self.precision==0:
            return f"General body part: {self.name}"
        else:
            return f"Precise body part: {self.name}"

class Ingredient(models.Model):
    name = models.CharField(default="ingredient", max_length=64)

    def __str__(self):
        return f"{self.name}"

class Symptom(models.Model):
    name = models.CharField(default="name", max_length=64)
    body_parts = models.ManyToManyField(BodyPart, blank=True, related_name="symptoms")
    tags = models.ManyToManyField(Tag, blank=True, related_name="symptoms")

    def __str__(self):
        return self.name

class Cure(models.Model):
    name = models.CharField(default="name", max_length=64)
    validated = models.BooleanField(default=False)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.symptom})"

class Recipe(models.Model):
    name = models.CharField(default="Recipe Name", max_length=64)
    ingredients = models.ManyToManyField(Ingredient, blank=True, related_name="recipes")
    cure = models.ForeignKey(Cure, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name

class RecipeStep(models.Model):
    description = models.TextField(default="description")
    step_number = models.IntegerField(default=1)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        text = self.description[:25]
        return f"Step {self.step_number}: {text}.."
