from sklearn import metrics
from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.model_selection import train_test_split
import pickle 
from matplotlib import pyplot
from flask import Flask, request

from io import StringIO

"""
    To run a flask server just type into your terminal

    FLASK_APP=app.py
    flask run

"""

app = Flask(__name__)


def modelLung(prediction):
    print('Your prediction..........')
    
    if prediction == 1:
        return 'There is high probability that you have lung cancer'
    elif prediction == 2:
        return ' you have lung cancer but at a mild level'
    else:
        return 'You dont seem to have lungs cancer'


@app.route("/predictLung", methods=["POST"])
def predictLung():

    # Importing the dataset
    dataset = pd.read_csv('Data.csv')
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, 23].values

    # head
    print(dataset.head(20))

    # descriptions
    print(dataset.describe())

    # class distribution
    print(dataset.groupby('Level').size())

    # Splitting the dataset into the Training set and Test set
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    # Logistic Regression
    logreg = LogisticRegression(max_iter=2000)
    logreg.fit(X_train, y_train)

    y_pred = logreg.predict(X_test)

    # Making the Confusion Matrix
    cnf_matrix = metrics.confusion_matrix(y_test, y_pred)
    print(cnf_matrix)

# Show Accuracy
    result = logreg.score(X_test, y_test)
    print("Test score: {0:.2f} %".format(100 * result))

# Save Model to File
    pickle.dump(logreg, open('LogReg.pk1', 'wb'))
    data = request.data
    array=data.decode('utf8').split(',') 
    new = [int(numeric_string) for numeric_string in array]


# convert each element as integers
   
# print list as integers

# define input
# new_input = [[17, 1, 	3, 	1,	5,	3,	4,	2,	2,	2,	2,	4,	2,	3,	1,	3,	7, 8,	6,	2,	1,	7,	2]]
    
    new_input = [new]

# get prediction for new input
    new_output = logreg.predict(new_input)

    print(new_input, new_output)

    print(new_output)

    return modelLung(new_output)


if __name__ == '__main__':
    app.run(debug=True)
