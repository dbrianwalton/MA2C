<?xml version='1.0'?> <!-- As XML file -->

<!--********************************************************************
Copyright 2015 D. Brian Walton

This file a customization file to work with MathBook XML.
*********************************************************************-->

<!-- Identify as a stylesheet -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:xml="http://www.w3.org/XML/1998/namespace"
    xmlns:exsl="http://exslt.org/common"
    xmlns:date="http://exslt.org/dates-and-times"
    extension-element-prefixes="exsl date"
>

<xsl:import href="/Users/waltondb/mathbook/xsl/mathbook-latex.xsl" />


<!-- Rewrite the cover -->
<!-- "half-title" is leading page with -->
<!-- title only, at about 1:2 split    -->
<xsl:template match="book/coverimage" >
    <xsl:value-of select="book/coverimage/@source"/>
</xsl:template>

<xsl:template match="book" mode="half-title" >
    <xsl:text>%% begin: half-title&#xa;</xsl:text>
    <xsl:text>\thispagestyle{empty}&#xa;</xsl:text>
    <xsl:choose>
        <xsl:when test="/mathbook/docinfo/coverimage">
            <xsl:text>{\centering&#xa;</xsl:text>
            <xsl:text>\vspace*{0.2\textheight}&#xa;</xsl:text>
            <xsl:text>\includegraphics[width=\textwidth]{</xsl:text>
            <xsl:value-of select="/mathbook/docinfo/coverimage"/>
            <xsl:text>}&#xa;&#xa;</xsl:text>
            <xsl:text>\vspace{-0.8\textwidth}&#xa;</xsl:text>
            <xsl:text>{\Huge \color{white}</xsl:text>
            <xsl:apply-templates select="/mathbook/book" mode="title-full"/>
            <xsl:text>}\\</xsl:text> <!-- always end line inside centering -->
            <xsl:if test="/mathbook/book/subtitle">
                <xsl:text>[2\baselineskip]&#xa;</xsl:text> <!-- extend line break if subtitle -->
                <xsl:text>{\LARGE  \color{white}</xsl:text>
                <xsl:apply-templates select="/mathbook/book" mode="subtitle"/>
                <xsl:text>}\\&#xa;</xsl:text>
            </xsl:if>
            <xsl:text>}&#xa;</xsl:text>
        </xsl:when>
        <xsl:otherwise>
            <xsl:text>{\centering&#xa;</xsl:text>
            <xsl:text>\vspace*{0.28\textheight}&#xa;</xsl:text>
            <xsl:text>{\Huge </xsl:text>
            <xsl:apply-templates select="/mathbook/book" mode="title-full"/>
            <xsl:text>}\\</xsl:text> <!-- always end line inside centering -->
            <xsl:if test="/mathbook/book/subtitle">
                <xsl:text>[2\baselineskip]&#xa;</xsl:text> <!-- extend line break if subtitle -->
                <xsl:text>{\LARGE </xsl:text>
                <xsl:apply-templates select="/mathbook/book" mode="subtitle"/>
                <xsl:text>}\\&#xa;</xsl:text>
            </xsl:if>
            <xsl:text>}&#xa;</xsl:text> <!-- finish centering -->
        </xsl:otherwise>
    </xsl:choose>
    <xsl:text>\clearpage&#xa;</xsl:text>
    <xsl:text>%% end:   half-title&#xa;</xsl:text>
</xsl:template>

<!-- Code to reset the page before each section -->
<xsl:template name="mc-section-heading">
	<xsl:text>% DBW, 2016/08/23&#xa;</xsl:text>
	<xsl:text>% Make sure every section gets clean page.&#xa;</xsl:text>
	<xsl:text>%&#xa;</xsl:text>
	<xsl:text>\let\oldsection\section&#xa;</xsl:text>
	<xsl:text>\renewcommand\section{\clearpage\oldsection}&#xa;</xsl:text>
	<xsl:text>%&#xa;</xsl:text>
</xsl:template>


<!-- Stuff them into the preamble at the end -->
<xsl:param name="latex.preamble.late">
	<xsl:call-template name="mc-section-heading" />
</xsl:param>


</xsl:stylesheet>
