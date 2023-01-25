# Assignment 2 - TNM111
# Authors: Maria Brunned (marbr780) & Malva Jansson (malja934)
# Task: Implementing a scatter plot

# Import libraries 
import pandas as pd

# Implemenatation
# Draw the x- and y-axis, together with ticks and tick values
# Display a legend that shows the categorial information
# Display categorical information of the data points by using different shapes to represent the points
# Display the data points correctly with respect to the axes
# Set the value range automatically based on the data vlaues presnet in the data set 

data1 = pd.read_csv("data1.csv")
data2 = pd.read_csv("data2.csv")

print(data1)
print('\n')
print(data2)


df = pd.dataFrame(data1,columns = [''])
