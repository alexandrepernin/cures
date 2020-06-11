from django.test import Client, TestCase
from .models import *

class ModelTestCase(TestCase):

        def setUp(self):

            # Create tags and body parts.
            tag1 = Tag.objects.create(name="Articulation")
            tag2 = Tag.objects.create(name="Douleur")

            # Create Body Parts.
            b1 = BodyPart.objects.create(name="Jambe", precision=0)
            b2 = BodyPart.objects.create(name="Genou", precision=1)

            # Create Ingredients
            i1 = Ingredient.objects.create(name="Poivre")

            # Create Symptom.
            s = Symptom.objects.create(name="Articulations douloureuses")
            s.body_parts.add(b1)
            s.body_parts.add(b2)
            s.tags.add(tag1)
            s.tags.add(tag2)
            s.save()

            # Create Cure
            cure = Cure.objects.create(name="Massage des articulations", validated=True, symptom=s)

            # Create Recipe
            recipe = Recipe.objects.create(name="Onguent au poivre", cure=cure)
            recipe.ingredients.add(i1)

            # Create Steps
            step1 = RecipeStep.objects.create(description="Mélanger le poivre", step_number=1, recipe=recipe)
            step2 = RecipeStep.objects.create(description="Appliquer sur la peau", step_number=2, recipe=recipe)

        def test_cure_detail(self):
            cure = Cure.objects.get(name="Massage des articulations")
            id = cure.pk
            c = Client()
            response = c.get(f"/api/cures/{id}/details/")
            self.assertEqual(response.status_code, 200)

        def test_symptom_search(self):
            c = Client()
            response = c.post('/api/symptoms/', {'search': 'Arti'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json()[0]['name'], "Articulations douloureuses")
