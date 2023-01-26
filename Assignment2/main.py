# Assignment 2 - TNM111
# Authors: Maria Brunned (marbr780) & Malva Jansson (malja934)
# Task: Implementing a scatter plot

# Import libraries 
import pandas as pd
from tkinter import *

# Implemenatation
# Draw the x- and y-axis, together with ticks and tick values
# Display a legend that shows the categorial information
# Display categorical information of the data points by using different shapes to represent the points
# Display the data points correctly with respect to the axes
# Set the value range automatically based on the data vlaues presnet in the data set 

data1 = pd.read_csv("data1.csv",names=['x','y','group'])
data2 = pd.read_csv("data2.csv")

print(data1)
print('\n')
#print(data2)
# get max and min value of column x and y
maxXY = data1.max()
minXY = data1.min()
print(minXY[1])

# Create an instance of tkinter frame or window
win=Tk()

# Set the size of the tkinter window 
winX = maxXY[0]+abs(minXY[0]) + 50
winY = maxXY[1]+abs(maxXY[1]) + 50
win.geometry(str(winX) + "x" + str(winY))

# Create a canvas widget
canvas = Canvas(win, width=500, height=300)
canvas.pack()
canvas.configure(scrollregion=canvas.bbox("ALL"))

# Add a line in canvas widget
offsetX = winX / 2
offsetY = winY / 2
canvas.create_line(offsetX,minXY[1]+offsetX,offsetY,maxXY[1]+offsetY, fill = "green", width=2)
canvas.create_line(minXY[0]+offsetX,offsetX,maxXY[0]+offsetY,offsetY, fill = "green", width=2)

win.mainloop()


#df = pd.DataFrame(data1,columns = ['x','y','group'])
#ax1 = df.plot.scatter(x='x',y='y',c='DarkBlue')

#print(df)