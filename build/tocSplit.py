import sys
import os
import re

# First parse the command-line options for annotation.
rootName = "model-calculus"
targetDir = "./pdf/"
skipPages = 8

i=1
pslName = ""
btdpName = ""
argc = len(sys.argv)
while (i < argc):
    arg = sys.argv[i]
    if arg == '-r':
        rootName = sys.argv[i+1]
        i += 1
    elif arg == '-t':
        targetDir = sys.argv[i+1]
        i += 1
    elif arg == '-s':
        skipPageStr = sys.argv[i+1]
        skipPages = int(skipPageStr)
        i += 1
    i += 1

tocFile = open(rootName+".toc", "r")
if (not os.path.isdir(targetDir) and not os.path.exists(targetDir)):
    os.mkdir(targetDir)

openEntry = False
for line in tocFile:
    if line.startswith("\\contentsline"):
        regExpr = "{([^{}]*)({)?(?(2)([^}]*}[^}]*))}"
        matches = re.findall(regExpr, line)
        entryType = ''.join(matches[0])
        entryTitle = ''.join(matches[1])
        entryPage = ''.join(matches[2])
        entryCode = ''.join(matches[3])
        
        # See if this entry type ends a section
        if openEntry and entryType in ('chapter', 'section'):
            print "gs -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dSAFER -dFirstPage=%s -dLastPage=%d -sOutputFile=%s%s.pdf %s.pdf" % (int(openEntryPage)+skipPages, int(entryPage)+skipPages-1, targetDir, openEntryCode, rootName)
            openEntry = False
        
        # See if this entry starts a section
        if entryType == 'section':
            openEntry = True
            openEntryType = entryType
            openEntryTitle = entryTitle
            openEntryPage = entryPage
            openEntryCode = entryCode
