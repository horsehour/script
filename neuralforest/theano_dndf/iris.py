import numpy as np
import pandas as pd
from neuralforest import ShallowNeuralForest

highest_acc = 0
def on_epoch(epoch, loss, tloss, accur):
    global highest_acc
    if accur > highest_acc:
        highest_acc = accur
    print("epoch[%3d] accuracy: %.5lf (loss train %.5lf, test %.5lf). Highest accuracy: %.5lf" % (epoch, accur, loss, tloss, highest_acc))


ipd = pd.read_csv("iris.csv")
X = ipd.ix[:,:4]
y = ipd.ix[:,4:]

model = ShallowNeuralForest(X.shape[1], y.shape[1], regression=False)
m = 100
model.fit(X.ix[:m,:], y.ix[:m,:], X.ix[m:,:], y.ix[m:,:], on_epoch=on_epoch, verbose=True)
