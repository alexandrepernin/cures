import pandas as pd
from cures.models import Tag, Ingredient, BodyPart

def delete_all():
    Tag.objects.all().delete()
    BodyPart.objects.all().delete()
    Ingredient.objects.all().delete()

def show_data(model):
    print("NOW IN DATABASE:")
    data = model.objects.all()
    for entry in data:
        print(entry)

def import_fields(path, category_name, model):
    data = pd.read_csv(path)
    data.columns=[category_name]
    data = data.drop_duplicates(subset=[category_name])
    data[category_name] = [entry.strip() for entry in data[category_name].tolist()]
    for entry in data[category_name].tolist():
        for_import = model(name=entry)
        for_import.save()
    print(f"ALL {category_name}s IMPORTED!")

def import_body_parts(path, category_name, model, precision_level):
    data = pd.read_csv(path)
    data.columns=[category_name]
    data = data.drop_duplicates(subset=[category_name])
    data[category_name] = [entry.strip() for entry in data[category_name].tolist()]
    for entry in data[category_name].tolist():
        for_import = model(name=entry, precision=precision_level)
        for_import.save()
    print(f"ALL {category_name}s IMPORTED!")

def run():
    delete_all()
    import_fields('cures/data/tags.csv', 'Tag', Tag)
    import_fields('cures/data/ingredients.csv', 'Ingredient', Ingredient)
    import_body_parts('cures/data/body_precise.csv', 'PreciseBodyPart', BodyPart, 1)
    import_body_parts('cures/data/body_general.csv', 'GeneralBodyPart', BodyPart, 0)
    show_data(BodyPart)
