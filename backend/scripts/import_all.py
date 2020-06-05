import pandas as pd
from cures.models import Tag, Ingredient, BodyPart, Symptom, Cure, Recipe, RecipeStep

def delete_all():
    Tag.objects.all().delete()
    BodyPart.objects.all().delete()
    Ingredient.objects.all().delete()
    Symptom.objects.all().delete()
    Cure.objects.all().delete()
    Recipe.objects.all().delete()
    RecipeStep.objects.all().delete()

def show_data(model):
    print("NOW IN DATABASE:")
    data = model.objects.all()
    for entry in data:
        print(entry)

def import_csv(path):
    data = pd.read_csv(path)
    print(data.columns)
    return data

def run():
    # Delete all instances in DB
    delete_all()
    #Import data from csv
    data = import_csv('cures/data/data_all.csv')
    for row in range(len(data)):
    #for row in range(1):
        print(row)
        # Symptom
        symptom = data.loc[row, "Symptom"]
        symptom = symptom.strip().capitalize()
        symptom_in_db = Symptom.objects.filter(name=symptom).first()
        if not symptom_in_db:
            symptom_in_db = Symptom(name=symptom)
        symptom_in_db.save()
        # Tags for symptom
        columns = ['Tag_1', 'Tag_2', 'Tag_3', 'Tag_4', 'Tag_5', 'Tag_6', 'Tag_7',
            'Tag_8','Tag_9', 'Tag_10', 'Tag_11', 'Tag_12']
        tags = data.loc[row, columns]
        tags = tags[tags.notnull()].to_frame(name='name')
        tags.name = [x.strip().capitalize() for x in tags.name]
        for tag in tags.name:
            tag_in_db = Tag.objects.filter(name=tag).first()
            if not tag_in_db:
                tag_in_db = Tag(name=tag)
                tag_in_db.save()
            symptom_in_db.tags.add(tag_in_db)
            symptom_in_db.save()
        # General Body Parts for symptoms
        columns = ['General_1', 'General_2']
        parts = data.loc[row, columns]
        parts = parts[parts.notnull()].to_frame(name="name")
        parts.name = [x.strip().capitalize() for x in parts.name]
        for part in parts.name:
            part_in_db = BodyPart.objects.filter(name=part, precision=0).first()
            if not part_in_db:
                part_in_db = BodyPart(name=part, precision=0)
                part_in_db.save()
            symptom_in_db.body_parts.add(part_in_db)
            symptom_in_db.save()
        # Precise Body Parts for symptoms
        columns = ['Precise_1', 'Precise_2']
        parts = data.loc[row, columns]
        parts = parts[parts.notnull()].to_frame(name="name")
        parts.name = [x.strip().capitalize() for x in parts.name]
        for part in parts.name:
            part_in_db = BodyPart.objects.filter(name=part, precision=1).first()
            if not part_in_db:
                part_in_db = BodyPart(name=part, precision=1)
                part_in_db.save()
            symptom_in_db.body_parts.add(part_in_db)
            symptom_in_db.save()
        # Cure => Can have 2 with same name => synonyms are ok
        cure = data.loc[row, "Cure"]
        cure = cure.strip().capitalize()
        cure_in_db = Cure.objects.filter(name=cure, validated=True, symptom=symptom_in_db).first()
        if not cure_in_db:
            cure_in_db = Cure(name=cure, validated=True, symptom=symptom_in_db)
        cure_in_db.save()
        # Recipe: can have several objects with same name
        recipe = data.loc[row, "Recipe"]
        recipe = recipe.strip().capitalize()
        recipe = Recipe(name=recipe, cure=cure_in_db)
        recipe.save()
        # Ingredients: uniques
        columns = ['Ingredient_1','Ingredient_2', 'Ingredient_3', 'Ingredient_4',
            'Ingredient_5','Ingredient_6', 'Ingredient_7']
        ingredients = data.loc[row, columns]
        ingredients = ingredients[ingredients.notnull()].to_frame(name='name')
        ingredients.name = [x.strip().capitalize() for x in ingredients.name]
        for ingredient in ingredients.name.tolist():
            in_db = Ingredient.objects.filter(name=ingredient).first()
            if not in_db:
                in_db = Ingredient(name=ingredient)
                in_db.save()
            recipe.ingredients.add(in_db)
        recipe.save()
        # Steps: add all without caring for duplicates
        columns = ['Step_1', 'Step_2', 'Step_3', 'Step_4','Step_5', 'Step_6',
            'Step_7', 'Step_8', 'Step_9', 'Step_10', 'Step_11','Step_12']
        steps = data.loc[row, columns]
        steps = steps[steps.notnull()].to_frame(name='name')
        steps.name = [x.strip().capitalize() for x in steps.name]
        for index, desc in enumerate(steps.name.tolist()):
            #We create the step through the recipe object
            step = recipe.recipestep_set.create(description=desc, step_number=index+1)
            step.save()
        recipe.save()

    show_data(Symptom)
    show_data(Tag)
    show_data(BodyPart)
    show_data(Cure)
    show_data(Recipe)
    show_data(Ingredient)
