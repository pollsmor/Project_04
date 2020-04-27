# Disease Comparison: Day by Day by ihatequarantine

**Roster/Roles**
- Kevin Li:
  - Project manager
  - Update README, makes sure devlog is up to date
  - Update design doc to reflect changes  to project midway through
  - Some coding for the D3 part (specifically hovering over a line for more detailed info)
- Derek Leung
  - D3 work
    - Drawing the base line graph (scale does not change)
    - Allow the user to choose how many days to show on the X-axis (minimum 100 days, maximum 801 days)
  - Will help with JavaScript if necessary
- Justin Shaw
  - D3 work
    - Toggling specific lines on and off on the graph
    - Scale Y-axis accordiongly as diseases are switched off by the user
  - General JavaScript work
- Albert Wan
  - Will mainly work with Flask and Python to read the CSV file
  - CSS/Bootstrap styling
  
## Description
This website is an interactive line graph that allows the visitor to compare various epidemics/pandemics in recent history (e.g. the 2010 Hispaniola Cholera outbreak, COVID-19, etc.) in terms of total deaths, day by day. These features are included for interactivity with the website:
* Hiding specific lines to focus more closely on the remaining outbreaks
* Choose the amount of days to look at
  - By default, the data only shows up to 300 days into an outbreak.
  - The user may set a minimum of 100 days, and a maximum of 801 days (the extent of the dataset used).
* Hovering over a point on a line for more granular day (e.g. on the 65th day of the COVID-19 outbreak, 3202 people have died).
  - Compares the other outbreaks by that point in time with the equivalent for the COVID-19 for more applicability to current times (total amount of deaths this many days into the start of their respective outbreaks)
  
# Instructions for running this project

**Dependencies**

You must install the pip modules listed in the /doc/requirements.txt file. To do so, install them in a Terminal with:
```bash
pip install -r <location of requirements.txt file>
```

The -r flag is necessary to distinguish it from a typical pip install. Without the -r, pip will look for a package online called "requirements.txt". That is obviously not desirable.

Note that on certain systems (like the school computers), the pip command may be restricted. To get around this, create a virtual environment with:
```bash
python3 -m venv <name_of_venv>
```
*Note that if your system only has Python 3 installed, just remove the 3 from the above command.*

To activate the virtual environment, cd into the directory you created the environment in, and run the "activate" file. Now, you should be able to pip install the requirements. To deactivate the environment, run the "deactivate" file.  

**Run the program**

After installing the required dependencies, all you need to do to run the program is to type into a terminal session:
```bash
python3 app.py
```
*Again, remove the 3 after the "python" if necessary.*
