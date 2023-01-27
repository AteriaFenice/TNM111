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

# Create an instance of tkinter frame or window
win=Tk()

# Set the size of the tkinter window 
scale = 5 # otherwise window is too small
winX = scale * (maxXY[0]+abs(minXY[0])) + 50 # dynamically changed based on database
winY = scale * (maxXY[1]+abs(maxXY[1])) + 50
win.geometry(str(winX) + "x" + str(winY)) # set size of window

# Create a canvas widget
canvas = Canvas(win, width=500, height=300)
canvas.pack(fill="both", expand=True)

# Add a line in canvas widget
offsetX = winX / 2 # to get origin in center of window
offsetY = winY / 2
yAxis = scale*minXY[0]+offsetX,offsetX,scale*maxXY[0]+offsetY,offsetY # points of y-axis
xAxis = offsetX,scale*minXY[1]+offsetX,offsetY,scale*maxXY[1]+offsetY # points of x-axis

canvas.create_line(yAxis, fill = "black", width=2) # create y-axis
canvas.create_line(xAxis, fill = "black", width=2) # create x-axis

# ticks
for i in range(minXY[0], maxXY[0]):
    if(i%10 == 0 and i != 0): # ticks in interwall of 10
        canvas.create_line(scale*i+offsetX, -2+offsetY, scale*i+offsetX, 2+offsetY, fill = "black", width=1)
        tick = Label(win, text=str(i)).place(x=scale*i+offsetX, y=15+offsetY, anchor="center", width=20)


for i in range(minXY[1], maxXY[1]):
    if(i%10 == 0 and i != 0):
        canvas.create_line(-2+offsetX, scale*i+offsetY, 2+offsetX, scale*i+offsetY, fill = "black", width=1)
        tick = Label(win, text=str(i)).place(x=-15+offsetX, y=scale*i+offsetY, anchor="center", width=20)


win.mainloop()


#df = pd.DataFrame(data1,columns = ['x','y','group'])
#ax1 = df.plot.scatter(x='x',y='y',c='DarkBlue')

#print(df)