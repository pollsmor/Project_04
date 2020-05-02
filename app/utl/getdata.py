import csv

# Run once every time __init__.py runs (through the import statement)
# =============================================================================
CSV_FILE = "static/epidemic-deaths-by-day.csv"

epidemic_names = ['cholera-hispaniola-2010', 'covid-19', 'ebola-wafrica-2014',
                  'swine-world-2009', 'sars', 'measles-2019', 'measles-2011',
                  'cholera-zimbabwe-2008', 'cholera-yemen-2016', 'ebola-drcuganda-2018',
                  'swine-india-2015', 'meningitis', 'mers']

epidemics_dict = {}
epidemic_idx = 0

file = open(CSV_FILE)
data = csv.reader(file)
for row in data:
    arr = []
    i = 1
    for col in row[1:]: #first column is the disease name not a day's stats
        arr.append({'day': i, 'deaths': col})
        i += 1

    epidemics_dict[epidemic_names[epidemic_idx]] = arr
    epidemic_idx += 1

file.close()

# =============================================================================

def getData():
    return epidemics_dict
