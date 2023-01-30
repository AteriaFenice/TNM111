# Assignment 2 - TNM111
# Authors: Maria Brunned (marbr780) & Malva Jansson (malja934)
# Task: Implementing a scatter plot

# Import libraries 
import pandas as pd
import numpy as np
from math import *
from tkinter import *
from collections import Counter

# Implemenatation

data1 = pd.read_csv("data1.csv",names=['x','y','group'])
data2 = pd.read_csv("data2.csv",names=['x','y','group'])

dataset = data2
data = dataset.to_numpy()# From csv to array
print(dataset)

# get max and min value of column x and y
maxXY = dataset.max()
minXY = dataset.min()

# Create an instance of tkinter frame or window
win=Tk()

# Set the size of the tkinter window 
scale = 3 # otherwise window is too small
winX = scale * floor((maxXY[0]+abs(maxXY[0]))) + 200 # dynamically changed based on database
winY = scale * floor((maxXY[1]+abs(maxXY[1]))) + 100
win.geometry(str(winX) + "x" + str(winY)) # set size of window

print("windowX: ", winX)
print("windowY: ", winY)

# Create a canvas widget
canvas = Canvas(win, width=winX, height=winY)
canvas.pack(fill="both", expand=True)

# Axes-extension
axEx = 10

# Add a line in canvas widget
offsetX = (winX-150) / 2 # to get origin in center of window 
offsetY = winY / 2
yAxis = -scale*(maxXY[0]+axEx)+offsetX, offsetY, scale*(maxXY[0]+axEx)+offsetX, offsetY # points of y-axis
xAxis = offsetX, -scale*(maxXY[1]+axEx)+offsetY, offsetX,scale*(maxXY[1]+axEx)+offsetY # points of x-axis
print("yAxis: ", yAxis)
print("xAxis: ", xAxis)

canvas.create_line(xAxis, fill = "black", width=2) # create x-axis
canvas.create_line(yAxis, fill = "black", width=2) # create y-axis

# ticks
for i in range(-floor(maxXY[0]+axEx), floor(maxXY[0]+axEx)):
    if(i%10 == 0 and i != 0): # ticks in intervals of 10
        canvas.create_line(scale*i+offsetX, -3+offsetY, scale*i+offsetX, 3+offsetY, fill = "black", width=1)
        tick = Label(win, text=str(i)).place(x=scale*i+offsetX, y=15+offsetY, anchor="center")


for i in range(-floor(maxXY[1]+axEx), floor(maxXY[1]+axEx)):
    if(i%10 == 0 and i != 0):
        canvas.create_line(-3+offsetX, scale*i+offsetY, 3+offsetX, scale*i+offsetY, fill = "black", width=1)
        tick = Label(win, text=str(-i)).place(x=-15+offsetX, y=scale*i+offsetY, anchor="center")


# [row][column]
# Test
#canvas.create_oval((data[2][0])*scale+offsetX,(data[2][1])*scale+offsetY, (data[2][0])*scale+offsetX,(data[2][1])*scale+offsetY,fill='blue', width=4)
#canvas.create_oval((data[3][0])*scale+offsetX,(data[3][1])*scale+offsetY, (data[3][0])*scale+offsetX,(data[3][1])*scale+offsetY,fill='blue', width=4)

clicked = 1
# Prints all dots 
i = 0
group_amount = np.sort(list(Counter(dataset['group']).values())) # Count how many of each type
group_type = np.sort(list(set(dataset['group']))) # Gets the group types, sorted
#group_type2 = list(set(data2['group']))
print('groups: ', group_type)
print('how many of each group: ', group_amount)
size = 4 # Size of the points in the plot

# Left click event
def left_click(event):
    object_id = event.widget.find_withtag('current')[0] # get shape object id from click event
    tag = event.widget.gettags(object_id)[0] # get tag from object
    index = tag[5:] # index, remove "shape" from tag
    x = data[int(index)][0] # coordinates from data
    y = data[int(index)][1]

    # highlight clicked point
    size = 10
    global clicked
    global tempx
    global tempy
    global circle

    # remove when clicking again!
    if clicked == 1:
        canvas.move("move", -scale*x, scale* y)
        circle = canvas.create_oval(offsetX-size, offsetY+size, offsetX+size, offsetY-size,fill=None, outline='red' )
        #calculate quadrant
        for i in range(len(data)):
            # left upper quadrant
            if(data[i][0] < x and data[i][1] > y ):
                canvas.itemconfig(object[i], fill='red') # change color to red
            # right upper quadrant
            if(data[i][0] > x and data[i][1] > y ): 
                canvas.itemconfig(object[i], fill='green') # change color to green
            # left lower quadrant
            if(data[i][0] < x and data[i][1] < y ):
                canvas.itemconfig(object[i], fill='orange') # change color to orange
            # right lower quadrant
            if(data[i][0] > x and data[i][1] < y ):
                canvas.itemconfig(object[i], fill='pink') # change color to pink
            # does not change color if values are equal, not in either quadrant!
        print(clicked)
        clicked = 0
        print(clicked)
        tempx = x
        tempy = y
        print("clicked 1 time")
    else:
        canvas.move("move", scale*tempx, -scale* tempy)
        canvas.delete(circle)
        for i in range(len(data)):
            canvas.itemconfig(object[i], fill='blue') # change color to blue for all shapes
        clicked = 1
        print("clicked second time")
        return clicked
        



is_on = False


# Right click event
def right_click(event):

    global is_on 

    object_id = event.widget.find_withtag('current')[0] # get shape object id from click event
    tag = event.widget.gettags(object_id)[0] # get tag from object
    index = tag[5:] # index, remove "shape" from tag
    x = data[int(index)][0] # coordinates from data
    y = data[int(index)][1]

    # find 5 closest with euclidian distance
    dist = []
    for i in range(len(data)):
        dist.append(sqrt(pow((x-data[i][0]),2)+pow((y-data[i][1]),2)))

    index_list = np.argpartition(dist, 6) # find 6 smallest distances
    five = index_list[:6]

    # highligt 5 closest
    # FIX CODE
    
    if is_on == False:
        size = 10
        for i in five:
            if i == int(index): # clicked point
                canvas.create_oval((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill=None, outline='blue', tags="highlight" )
            else: # 5 closest
                canvas.create_oval((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill=None, outline='red', tags="highlight")
        is_on = True
        print("right on")

    else:
        canvas.delete("highlight") # Removes highlight
        is_on = False
        print("right off")



# Prints all dots 
i = 0
group_type = np.sort(list(set(dataset['group']))) # Gets the group types, sorted
#group_type2 = list(set(data2['group']))
print('groups: ', group_type)
size = 3 # Size of the points in the plot
object = {}
while (i < len(data)):

    # Prints the first group as circles
    if(data[i][2] == group_type[0]):
        object[i] = canvas.create_oval((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill='blue', tags=(("shape"+str(i)), "move"))

    # Prints the first group as squares
    if (data[i][2] == group_type[1]):
        object[i] = canvas.create_rectangle((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill='blue', tags=(("shape"+str(i)), "move"))

    # Prints the first group as triangles
    if(data[i][2] == group_type[2]):
        object[i] = canvas.create_polygon((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY-size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,  (data[i][0])*scale+offsetX, -(data[i][1])*scale+offsetY+size, fill='blue', tags=(("shape"+str(i)), "move"))

    canvas.tag_bind(("shape"+str(i)), "<Button-1>", left_click) # left click interaction
    canvas.tag_bind(("shape"+str(i)), "<Button-3>", right_click)# right clivk interaction

    i = i+1

# Legend
legend = Canvas(win, width=50, height=100)

print(len(group_type))

group_amount = np.sort(list(Counter(dataset['group']).values())) # Count how many of each type
print('how many of each group: ', group_amount)

i = 0
nextlineSpace = 20
text_legend = ""

shapes = [legend.create_oval(10,10+(nextlineSpace*(i+1)),10+size,10+(nextlineSpace*(i+1))+size,fill='blue'),
    legend.create_oval(10,10+(nextlineSpace*(i+1)),10+size,10+(nextlineSpace*(i+1))+size,fill='blue'),
    legend.create_oval(10,10+(nextlineSpace*(i+1)),10+size,10+(nextlineSpace*(i+1))+size,fill='blue'),
    ]

print(group_type[0] + ": " + str(group_amount[0]))

while i < len(group_type):
     shapes[i]
     text_legend = group_type[i] + ": " + str(group_amount[i])
     legend.create_text(30,10+(nextlineSpace*(i+1)),text=text_legend)
     i = i+1

canvas.grid(row=0,column=0)
legend.grid(row=0,column=1)



# LEGEND - lite skev, borde visa formerna
i=0
while (i < len(group_type)):
    shape = ['circle', 'square', 'triangle']

    leg = Label(win, text=str(shape[i])+" : "+str(group_type[i]) + ', ' + str(group_amount[i])).place(relx=0.95, rely=0.1+0.05*i, anchor="ne")

    i = i+1


win.mainloop()


